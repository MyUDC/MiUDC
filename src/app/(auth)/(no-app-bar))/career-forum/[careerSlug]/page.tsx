import { notFound } from "next/navigation";

import getCareerWithRelations from "@/features/career-forum/actions/getCareerWithRelations";
import CareerImage from "@/features/career-forum/components/CareerImage/CareerImage";
import { CareerTitle } from "@/features/career-forum/components/CareerTitle";
import CareerContent from "@/features/career-forum/CareerContent";
import AddButton from "@/shared/components/AddButton";

interface Props {
  params: {
    careerSlug: string;
  }
}

export default async function CareerForumView({ params }: Props) {
  const slug = params.careerSlug;
  const career = await getCareerWithRelations(slug);
  if (!career) notFound();

  return (
    <div className="max-w-2xl mx-auto pb-2">
      <div className="border border-gray-300 rounded-lg">
        <CareerImage
          src="/telematica.jpg"
        />
        <div className="px-6 md:px-12">
          <CareerTitle facultyName={career.faculty.name} careerName={career.name} />
          <CareerContent />
          <AddButton />
        </div>
      </div>
    </div>
  )
}
