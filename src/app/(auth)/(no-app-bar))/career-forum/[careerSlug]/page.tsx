import TempWraper from "@/features/career-forum/components/TempWraper";
import getCareerWithRelations from "@/shared/actions/Career/getCareerBasicData";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export default async function CareerForumView({ params }: Props) {
  const slug = params.slug;
  const career = await getCareerWithRelations(slug);
  if (!career) notFound();

  return (
    <TempWraper career={career!} />
  )
}
