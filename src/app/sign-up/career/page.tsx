import Button from "@/components/buttons/Button";
import Select from "@/components/form/Select";
import Image from "next/image";
import Link from "next/link";

export default function CareerPage() {
  return (
    <div className="h-svh flex flex-col justify-center align-middle p-4 gap-2">
      <div className="flex justify-center">
        <Image
          src="/svgs/logo-inline.svg"
          alt="logotipo de MiUdc"
          width={230}
          height={230}
          priority
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-lg">Semestre y Carrera</h1>
        <form action="">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Select
                title="Carrera"
                placeholder="Selecciona tu carrera"
                name="career"
                id="career"
                options={[
                  { value: "1", label: "Ingeniería en Sistemas" },
                  { value: "2", label: "Ingeniería en Electrónica" },
                  { value: "3", label: "Ingeniería en Mecatrónica" },
                  { value: "4", label: "Ingeniería en Informática" },
                  { value: "5", label: "Ingeniería en Cibernética" },
                  { value: "6", label: "Ingeniería en Computación" },
                ]}
              />
            </div>
            <div className="flex flex-col">
              <Select
                title="Semestre"
                placeholder="Selecciona tu semestre"
                name="semester"
                id="semester"
                options={[
                  { value: "1", label: "Primero" },
                  { value: "2", label: "Segundo" },
                  { value: "3", label: "Tercero" },
                  { value: "4", label: "Cuarto" },
                  { value: "5", label: "Quinto" },
                  { value: "6", label: "Sexto" },
                  { value: "7", label: "Séptimo" },
                  { value: "8", label: "Octavo" },
                ]}
              />
            </div>
          </div>
          <div className="pt-3">
            <Button text="Continuar" path="" variant="green" />
          </div>
        </form>
      </div>
    </div>
  );
}