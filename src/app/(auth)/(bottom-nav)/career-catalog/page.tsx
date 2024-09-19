import { AppBar } from "@/shared/components/AppBar";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

import MostPopularCareers from "@/features/career-catalog/MostPopularCareers";
import CareerCategories from "@/features/career-catalog/CareerCategories";

export const metadata: Metadata = {
  title: "MiUDC | Career Catalog",
  description: "Catalog of careers available in the University of Colima",
};

export default function CareerCatalogPage() {
  return (
    <>
      <AppBar />
      <div className="flex justify-center pt-4">
        {/** Carreras favoritas */}
        <div className="w-full sm:max-w-5xl mt-16 px-4">
          <section>
            <div className="flex justify-between items-center">
              <p className="max-w-2xl mt-1 text-gray-500 text-sm uppercase">
                Carreras favoritas de la comunidad
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Las más populares
              </h1>
              <Button variant="ghost" className="text-md text-green ">
                Ver más
              </Button>
            </div>
            <MostPopularCareers />
          </section>

          {/** Categorias */}
          <section className="mt-8">
            <div className="flex justify-between items-center ">
              <p className="max-w-2xl text-gray-500 text-sm uppercase">
                Explora
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="max-w-2xl text-3xl font-bold text-black tracking-tight leading-none">
                Explorar Categorías
              </h1>
              <Button variant="ghost" className="text-md text-green">
                Ver más
              </Button>
            </div>
            <CareerCategories />
          </section>
        </div>
      </div>
    </>
  );
}
