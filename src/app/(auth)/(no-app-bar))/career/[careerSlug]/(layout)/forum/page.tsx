import { redirect } from "next/navigation";

interface Props {
  params: {
    careerSlug: string;
  }
}

export default function CareerForumPage ({ params }: Props) {
  const { careerSlug } = params;

  redirect(`/career/${careerSlug}/forum/testimonies`);
}