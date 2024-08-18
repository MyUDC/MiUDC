import { notFound } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import paginateComments from "@/shared/actions/Comment/paginateComments";
import getTestimonyBySlug from "@/shared/actions/Testimony/getTestimonyBySlug";
import Testimony from "@/shared/components/Testimony/Testimony";
import { CommentsList } from "@/shared/components/Comments/CommentsList/CommentsList";
import BackButton from "@/shared/components/BackButton";

interface Props {
  params: {
    testimonySlug: string;
  }
}

export default async function TestimonyPage({ params }: Props) {

  const slug = params.testimonySlug;
  const testimony = await getTestimonyBySlug(slug);
  if (!testimony) notFound();

  const initComments = await paginateComments(3, 0, testimony.id);

  return (
    <div>
      <div className="sticky top-0 z-20 bg-white pt-5 p-3 flex items-center gap-6 border-b border-gray-200">
        <BackButton />
        <h2 className="text-lg font-semibold">Testimonio</h2>
      </div>
      <Testimony
        key={testimony.id}
        createdAt={testimony.createdAt}
        content={testimony.content}
        commentCount={testimony._count.Comments}
        heartCount={testimony._count.TestimonyLike}
        careerData={{
          name: testimony.career.name,
          slug: testimony.career.slug
        }}
        userName={testimony.user.name ?? "no name"}
        userPhotoUrl={testimony.user.image ?? ""}
      />
      <div className="px-4 pb-4">
        <h2 className="font-semibold">Respuestas</h2>
      </div>
      <CommentsList
        testimonyId={testimony.id}
        initComments={initComments}
      />
    </div>
  );
}