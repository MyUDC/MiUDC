"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useMemo, useState } from "react";
import getCareers, { Career } from "@/shared/actions/Careers/getCareersNames";
import { useFormSwiperStore } from "@/stores/useFormSwiperStore";

const Form = FormProvider;

const FormSchema = z.object({
  accountNumber: z
    .string({ required_error: "Este campo es requerido" })
    .min(8, { message: "El número de cuenta debe tener 8 dígitos" })
    .max(8, { message: "El número de cuenta debe tener 8 dígitos" }),
  career: z
    .string({ required_error: "Este campo es requerido" })
    .min(1, { message: "Este campo es requerido" }),
  semester: z
    .string({ required_error: "Este campo es requerido" })
    .min(1, { message: "Este campo es requerido" }),
});

const semesters = [
  { value: "1", label: "Primero" },
  { value: "2", label: "Segundo" },
  { value: "3", label: "Tercero" },
  { value: "4", label: "Cuarto" },
  { value: "5", label: "Quinto" },
  { value: "6", label: "Sexto" },
  { value: "7", label: "Séptimo" },
  { value: "8", label: "Octavo" },
];

export default function ChooseCareerForm() {
  const [careers, setCareers] = useState<Career[] | never[]>([]);
  const { setValue, goToNextSlide, values: globalValues } = useFormSwiperStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountNumber: globalValues?.studentData?.accountNumber?.toString() || "",
      career: globalValues?.studentData?.careerId || "",
      semester: globalValues?.studentData?.semester || "",
    },
  });

  const watchCareer = form.watch("career");

  const semesters = useMemo(() => {
    if (!watchCareer) return [];
    const career = careers.find((career) => career.id === watchCareer);
    if (!career) return [];
    return Array.from({ length: career.semesters }, (_, index) => ({
      value: (index + 1).toString(),
      label: (index + 1).toString(),
    }));
  }, [careers, watchCareer]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { career, semester, accountNumber } = data;
    setValue("studentData", {
      careerId: career,
      semester: semester,
      accountNumber: parseInt(accountNumber, 10),
    });
    goToNextSlide();
  };

  useEffect(() => {
    const studentData = globalValues?.studentData;
    if (studentData) {
      form.reset({
        accountNumber: studentData.accountNumber?.toString() || "",
        career: studentData.careerId || "",
        semester: studentData.semester?.toString() || "",
      });
    }
  }, [globalValues, form]);

  useEffect(() => {
    console.log(watchCareer);
  }, [watchCareer]);

  useEffect(() => {
    getCareers()
      .then((careers) => {
        setCareers(careers);
        console.log(careers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Datos de Estudiante
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Número de cuenta */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="accountNumber">Número de cuenta</FormLabel>
                <FormControl>
                  <Input
                    id="accountNumber"
                    type="number"
                    placeholder="Número de cuenta"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Carrera */}
          <FormField
            control={form.control}
            name="career"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carrera</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu carrera" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {careers.map((career) => (
                      <SelectItem key={career.id} value={career.id}>
                        {career.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Semestre */}
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semestre</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu semestre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester.value} value={semester.value}>
                        {semester.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="green" type="submit">
            Continuar
          </Button>
        </form>
      </Form>
    </div>
  );
}
