import paginateTestimonies from "@/shared/actions/Testimony/paginatePosts";
import { TestimoniesList } from "@/shared/components/Testimony/TestimoniesList/TestimoniesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page",
};

export default async function HomePage() {

  const initTestimonies = await paginateTestimonies(3, 0);

  return (
    <div>
      <TestimoniesList
        initTestimonies={initTestimonies}
      />
    </div>
  );
}
