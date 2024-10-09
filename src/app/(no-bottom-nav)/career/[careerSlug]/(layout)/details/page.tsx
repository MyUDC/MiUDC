import { Metadata } from "next";
import { notFound } from "next/navigation";

import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career Details | MiUDC",
  description: "Career details",
};

interface Props {
  params: {
    careerSlug: string;
  };
}

export default async function CareerDetailsPage({ params }: Props) {
  const { careerSlug } = params;
  const career = await getCareerWithRelations(careerSlug);

  if (!career) {
    notFound();
  }

  return (
    <div className="px-4 flex flex-col gap-4 text-black">
      <h2 className="max-w-2xl text-2xl font-bold  tracking-tight leading-none text-left">
        Información de la carrera
      </h2>
      <div>
        <h3 className="font-bold max-w-2xl text-md uppercase">Descripción</h3>
        <p className="text-sm">{career.description}</p>
      </div>

      <div>
        <h3 className="font-bold max-w-2xl text-md uppercase">
          Plan de estudios
        </h3>
        <Link href="" className="text-sm">
          Conoce el plan de estudios
        </Link>
      </div>

      <div>
        <h3 className="font-bold max-w-2xl text-md uppercase">Ubicación</h3>
        <p className="text-sm">{career.location}</p>
        <iframe
          className="w-full h-36 rounded-xl pt-1 mt-4"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955147.1034123095!2d-104.24013322157782!3d20.74903605789971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84255a99891ff843%3A0xcd2e9349f999b45c!2sFacultad%20de%20Telem%C3%A1tica!5e0!3m2!1ses!2smx!4v1725092944799!5m2!1ses!2smx"
          loading="lazy"
        />
      </div>
    </div>
  );
}
