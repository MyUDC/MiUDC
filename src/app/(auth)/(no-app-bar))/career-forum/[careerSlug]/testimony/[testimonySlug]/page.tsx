import getTestimonyBySlug from "@/shared/actions/Testimony/getTestimonyBySlug";
import { notFound } from "next/navigation";

interface Props {
  params: {
    testimonySlug: string;
  }
}

export default async function TestimonyPage({ params }: Props) {
  
  const slug = params.testimonySlug;
  const testimony = await getTestimonyBySlug(slug);
  if (!testimony) notFound();

  return (
    <div>
      {testimony.slug}
    </div>
  );
}