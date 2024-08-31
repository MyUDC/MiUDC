import { redirect } from "next/navigation";

interface Props {
  params: {
    careerSlug: string;
  }
}

// todo redirecct to forum page
export default function ({ params }: Props) {
  const { careerSlug } = params;

  redirect(`/career/${careerSlug}/forum/testimonies`);
}