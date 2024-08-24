import { notFound } from "next/navigation";

import paginateComments from "@/shared/actions/Comment/paginateComments";
import getPostBySlug from "@/shared/actions/Testimony/getPostBySlug";
import Testimony from "@/shared/components/Testimony/Testimony";
import BackButton from "@/shared/components/BackButton";
import { CommentsList } from "@/shared/components/Comments/CommentsList/CommentsList";

interface Props {
  params: {
    testimonySlug: string;
  }
}

export default async function TestimonyPage({ params }: Props) {
  const slug = params.testimonySlug;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const initComments = await paginateComments(3, 0, post.id);

  return (
    <div className="flex flex-col items-center">
      <div className="sticky mb-4 w-full top-0 z-20 bg-white pt-5 p-3 flex items-center gap-6 border-b border-gray-200">
        <BackButton />
        <h2 className="text-lg font-semibold">Testimonio</h2>
      </div>
      <div className="flex flex-col items-center justify-center max-w-lg w-full">
        <Testimony
          key={post.id}
          createdAt={post.createdAt}
          content={post.content}
          testimonySlug={post.slug}
          commentCount={post._count.children}
          heartCount={post._count.PostLike}
          careerData={{
            name: post.career.name,
            slug: post.career.slug
          }}
          userName={post.author.name ?? "no name"}
          userPhotoUrl={post.author.image ?? ""}
          imageUrls={post.images.map(({url}) => (url))}
        />
        <div className="px-4 pb-4 w-full">
          <h2 className="font-semibold">Respuestas</h2>
        </div>
        <CommentsList
          testimonyId={post.id}
          initComments={initComments}
        />
      </div>
    </div>
  );
}