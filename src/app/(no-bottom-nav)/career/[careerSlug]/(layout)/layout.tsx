import { notFound } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import ForumDetailsTabs from "@/features/career/components/ForumDetailsTabs";
import CareerImages from "@/features/career/components/CareerImages";
import { CareerTitle } from "@/features/career/components/CareerTitle";
import BackButton from "@/shared/components/BackButton";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { saveCareer } from "@/shared/actions/Careers/saveCareer";
import { Card } from "@/components/ui/card";

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
  const session = await auth();
  const userId = session?.user?.id;

  const career = await getCareerWithRelations(slug);
  if (!career) notFound();

  let isSaved = false;
  if (userId) {
    const savedCareer = await prisma.savedCareer.findUnique({
      where: {
        userId_careerId: {
          userId: userId,
          careerId: career.id,
        },
      },
    });
    isSaved = !!savedCareer;
  }

  const path = `/career/${slug}`;

  return (
    <div className="flex items-center justify-center">
      <Card className="w-svw max-w-2xl mt-4 pb-2">
        <BackButton />
        <div className="mt-12">
          <CareerImages imageUrls={imageUrls} />
          <CareerTitle
            facultyName={career.faculty.name}
            careerName={career.name}
          />
          <div className="px-4">
            <form action={saveCareer.bind(null, career.id)}>
              <Button
                type="submit"
                variant="outline"
                className="flex items-center text-green hover:text-green"
              >
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </Button>
            </form>
          </div>
          <ForumDetailsTabs path={path} />
          {children}
        </div>
      </Card>
    </div>
  );
}
