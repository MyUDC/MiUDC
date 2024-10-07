import { notFound } from "next/navigation";
import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import ForumDetailsTabs from "@/features/career/components/ForumDetailsTabs";
import CareerImages from "@/features/career/components/CareerImages";
import { CareerTitle } from "@/features/career/components/CareerTitle";
import BackButton from "@/shared/components/BackButton";
import { FaRegBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "SEO Title",
  description: "SEO Title",
};

interface Props {
  children: React.ReactNode;
  params: {
    careerSlug: string;
  };
}

const imageUrls = [
  "/telematica.jpg",
  "https://res.cloudinary.com/dxdme71no/image/upload/v1722901389/hufhpfqpgmwr4p5kj1ja.jpg",
  "/telematica.jpg",
];

export default async function CareerLayout({ children, params }: Props) {
  const slug = params.careerSlug;
  const career = await getCareerWithRelations(slug);
  if (!career) notFound();

  const path = `/career/${slug}`;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-5xl mt-4 pb-2">
        <BackButton />
        <div className="mt-12">
          <CareerImages imageUrls={imageUrls} />
          <CareerTitle
            facultyName={career.faculty.name}
            careerName={career.name}
          />
          <div className="px-4">
            <Button variant="outline" className="flex items-center text-green">
              <FaRegBookmark />
            </Button>
          </div>
          <ForumDetailsTabs path={path} />
          {children}
        </div>
      </div>
    </div>
  );
}
