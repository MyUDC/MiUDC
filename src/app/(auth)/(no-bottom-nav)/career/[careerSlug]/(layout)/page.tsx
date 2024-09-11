import { redirect } from "next/navigation";

interface Props {
  params: {
    careerSlug: string
  };
}

export default function CareerPage({ params }: Props) {
  const {careerSlug} = params
  redirect(`/career/${careerSlug}/forum`);
}
