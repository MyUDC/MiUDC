import { AppBar } from "@/shared/components/AppBar";
import { Metadata } from "next";
import { CareerSection } from "@/features/career-catalog/components/CareerSection";
import CareerCategories from "@/features/career-catalog/CareerCategories";
import { fetchAllCareers } from "@/features/career-catalog/api/fetchCareers";
import { Card } from "@/components/ui/card";
import SearchBar from "@/shared/components/SearchBar";

export const metadata: Metadata = {
  title: "MiUDC | Career Catalog",
  description: "Catalog of careers available in the University of Colima",
};

export default async function CareerCatalogPage() {
  const {
    popularCareers,
    questionCareers,
    testimonyCareers,
    creativeCareers,
    techCareers,
    communicationCareers,
  } = await fetchAllCareers();

  return (
    <>
      <AppBar />
      <div className="flex justify-center py-4">
        <Card className="w-full max-w-2xl mt-16 pr-0 pl-4 md:px-4">
          <div className="w-full max-w-full mt-2 pr-1">
            <SearchBar />
          </div>

          <CareerSection
            title="Las más Populares"
            subtitle="Carreras con más interacciones"
            careers={popularCareers}
            paginationClass="swiper-pagination-popular"
          />

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

          <CareerSection
            title="Carreras con más Preguntas"
            subtitle="Las más consultadas"
            careers={questionCareers}
            paginationClass="swiper-pagination-questions"
          />

          <CareerSection
            title="Carreras con más Testimonios"
            subtitle="Las más valoradas"
            careers={testimonyCareers}
            paginationClass="swiper-pagination-testimonies"
          />

          <section className="mt-8 pb-8">
            <h1 className="max-w-2xl text-4xl font-bold text-black tracking-tight leading-none mb-8">
              Carreras basadas en tu interés vocacional
            </h1>

            <CareerSection
              title="Creatividad"
              subtitle="Echa a volar tu imaginación"
              careers={creativeCareers}
              paginationClass="swiper-pagination-creative"
              isLarge={false}
            />

            <CareerSection
              title="Tecnología"
              subtitle="Transforma el mundo con tu ingenio"
              careers={techCareers}
              paginationClass="swiper-pagination-tech"
              isLarge={false}
            />

            <CareerSection
              title="Comunicación"
              subtitle="Comunica y conecta con el mundo"
              careers={communicationCareers}
              paginationClass="swiper-pagination-communication"
              isLarge={false}
            />
          </section>
        </Card>
      </div>
    </>
  );
}
