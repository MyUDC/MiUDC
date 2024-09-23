import { AppBar } from "@/shared/components/AppBar";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

//based on data
import MostPopularCareers from "@/features/career-catalog/categories-sections/basedOnData/MostPopularCareers";
import CareersWithMoreQuestions from "@/features/career-catalog/categories-sections/basedOnData/CareersWithMoreQuestions";
import CareersWithMoreTestimonies from "@/features/career-catalog/categories-sections/basedOnData/CareersWithMoreTestimonies";
//based on tags
import MostCreativeCareers from "@/features/career-catalog/categories-sections/basedOnTags/MostCreativeCareers";

import CareerCategories from "@/features/career-catalog/CareerCategories";

export const metadata: Metadata = {
  title: "MiUDC | Career Catalog",
  description: "Catalog of careers available in the University of Colima",
};

export default function CareerCatalogPage() {
  return (
    <>
      <AppBar />
      <div className="flex justify-center py-4">
        <div className="w-full sm:max-w-5xl mt-16 pr-0 pl-4 md:px-4">
          {/** Sección de carreras más populares */}
          <section className="pb-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="max-w-2xl mt-1 text-gray-500 text-sm uppercase">
                Carreras con más interacciones
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Las más Populares
              </h1>
              <Button variant="ghost" className="text-md text-green">
                Ver más
              </Button>
            </div>
            <MostPopularCareers />
          </section>

          {/** Categorías */}
          <section className="mt-8 pb-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="max-w-2xl text-gray-500 text-sm uppercase">
                Explora
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Explorar Categorías
              </h1>
            </div>
            <CareerCategories />
          </section>

          {/** Carreras categorizadas con datos de la db */}

          {/** Carreras con más preguntas */}
          <section className="mt-8 pb-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="max-w-2xl text-gray-500 text-sm uppercase">
                Las más consultadas
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Carreras con más Preguntas
              </h1>
              <Button variant="ghost" className="text-md text-green">
                Ver más
              </Button>
            </div>
            <CareersWithMoreQuestions />
          </section>

          {/** Carreras con más testimonios */}
          <section className="mt-8 pb-8 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="max-w-2xl text-gray-500 text-sm uppercase">
                Las más valoradas
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Carreras con más Testimonios
              </h1>
              <Button variant="ghost" className="text-md text-green">
                Ver más
              </Button>
            </div>
            <CareersWithMoreTestimonies />
          </section>

          {/** Carreras categorizadas por tags  */}
          <section className="mt-8 pb-8">
            <h1 className="max-w-2xl text-4xl font-bold text-black tracking-tight leading-none">
              Carreras basadas en tu interés vocacional
            </h1>

            {/** Carreras más creativas */}
            <section className="mt-8 pb-8 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                  Carreras Creativas
                </h1>
                <Button variant="ghost" className="text-md text-green">
                  Ver más
                </Button>
              </div>
              <MostCreativeCareers />
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
