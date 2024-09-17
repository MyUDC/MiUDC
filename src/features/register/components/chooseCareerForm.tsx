"use client";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormProvider,
    useForm
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

const Form = FormProvider;

interface Props {
    careers: { id: string; name: string }[];
}

const FormSchema = z.object({
    accountNumber: z
        .string({ required_error: "Este campo es requerido" })
        .min(8, { message: "El número de cuanta debe tener 8 dígitos" })
        .max(8, { message: "El número de cuanta debe tener 8 dígitos" }),
    career: z
        .string({ required_error: "Este campo es requerido" })
        .min(1, { message: "Este campo es requerido" }),
    semester: z
        .string({ required_error: "Este campo es requerido" })
        .min(1, { message: "Este campo es requerido" }),
});

// todo: add this data to career model
const semesters = [
    { value: "1", label: "Primero" },
    { value: "2", label: "Segundo" },
    { value: "3", label: "Tercero" },
    { value: "4", label: "Cuarto" },
    { value: "5", label: "Quinto" },
    { value: "6", label: "Sexto" },
    { value: "7", label: "Séptimo" },
    { value: "8", label: "Octavo" },
]

export default function ChooseCareerForm({ careers }: Props) {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            career: undefined,
            semester: undefined,
            accountNumber: undefined
        }
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const { career, semester, accountNumber } = data;
        console.log(career, semester, accountNumber);
        Cookies.set("accountNumber", accountNumber?.toString()!);
        Cookies.set("career", career);
        Cookies.set("semester", semester.toString());
        router.push("/sign-up/register");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                {/* Account number field */}
                <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="accountNumber">
                                Número de cuenta
                            </FormLabel>
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

                {/* Career field */}
                <FormField
                    control={form.control}
                    name="career"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carrera</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona tu carrera" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        careers.map((career) => (
                                            <SelectItem key={career.id} value={career.id}>{career.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Semester field */}
                <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Semestre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field?.value?.toString()!}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona tu semestre" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        semesters.map((semester) => (
                                            <SelectItem key={semester.value} value={semester.value}>{semester.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="green"
                    type="submit"
                >
                    Continuar
                </Button>
            </form>
        </Form >
    );
}