import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import ForumDetailsTabs from "@/features/career/components/ForumDetailsTabs";
import CareerImages from "@/features/career/components/CareerImages";
import { CareerTitle } from "@/features/career/components/CareerTitle";
import DataInitializer from "@/features/career/components/DataInitialaizer";
import paginateCareerPosts from "@/shared/actions/Post/PaginateCareerPost";
import AddButton from "@/shared/components/AddButton";
import { useCareerStore } from "@/stores/useCareerStore";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: 'SEO Title',
  description: 'SEO Title',
};

interface Props {
  children: React.ReactNode;
  params: {
    careerSlug: string;
  }
}

const imageUrls = [
  '/telematica.jpg',
  'https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg',
  '/telematica.jpg',
]

export default async function CareerLayout({ children, params }: Props) {

  const slug = params.careerSlug;
  const career = await getCareerWithRelations(slug);
  if (!career) notFound();

  const initialTestimonies = await paginateCareerPosts(4, 0, career.id, "TESTIMONY");
  const initialQuestions = await paginateCareerPosts(4, 0, career.id, "QUESTION");

  useCareerStore.setState({
    careerId: career.id,
    initialTestimonies,
    initialQuestions
  })

  const path = `/career/${slug}`

  return (
    <div className="max-w-2xl mx-auto pb-2">
      <DataInitializer initialTestimonies={initialTestimonies} initialQuestions={initialQuestions} careerId={career.id} />
      <div className="border border-gray-300 rounded-lg">
        <CareerImages imageUrls={imageUrls} />
        <CareerTitle facultyName={career.faculty.name} careerName={career.name} />
        <ForumDetailsTabs path={path} />
        {children}
        <AddButton />
      </div>
    </div>
  )
}