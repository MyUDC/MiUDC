import { notFound } from "next/navigation";

import getCareerWithRelations from "@/features/career-forum/actions/getCareerWithRelations";
import CareerImage from "@/features/career-forum/components/CareerImage/CareerImage";
import { CareerTitle } from "@/features/career-forum/components/CareerTitle";
import CareerContent from "@/features/career-forum/CareerContent";
import AddButton from "@/shared/components/AddButton";
import paginateCareerPosts from "@/shared/actions/Post/PaginateCareerPost";
import { useCareerStore } from "@/stores/useCareerStore";
import DataInitializer from "@/features/career-forum/components/DataInitialaizer";

interface Props {
  params: {
    careerSlug: string;
  }
}

const imageUrls = [
  '/telematica.jpg',
  'https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg',
  '/telematica.jpg',
]

export default async function CareerForumView({ params }: Props) {
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

  return (
    <div className="max-w-2xl mx-auto pb-2">
        <DataInitializer initialTestimonies={initialTestimonies} initialQuestions={initialQuestions} careerId={career.id} />
        <div className="border border-gray-300 rounded-lg">
          <CareerImage
            imageUrls={imageUrls}
          />
          <div className="">
            <CareerTitle facultyName={career.faculty.name} careerName={career.name} />
            <CareerContent />
            <AddButton />
          </div>
        </div>
      </div>
  )
}
