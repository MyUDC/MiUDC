import getTestimonyBySlug from "@/shared/actions/Testimony/getTestimonyBySlug";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export default function TestimonyPage({ params }: Props) {
  
  // const slug = params.slug;
  // const testimony = getTestimonyBySlug(slug);
  // if (!testimony) notFound();

  return (
    <div>
      <h1>Hello Page asas</h1>
    </div>
  );
}