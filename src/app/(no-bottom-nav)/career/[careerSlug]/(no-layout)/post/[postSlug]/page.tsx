import { notFound } from "next/navigation";
import paginateComments from "@/shared/actions/Comment/paginateComments";
import getPostBySlug from "@/shared/actions/Post/getPostBySlug";
import Post from "@/shared/components/Testimony/Post";
import BackButton from "@/shared/components/BackButton";
import { CommentsList } from "@/shared/components/Comments/CommentsList/CommentsList";
import postTypeHumanized from "@/utils/PostTypeHumanized";
import { Metadata } from "next";
import { auth } from "@/auth";
import { getInitialLikeState } from "@/shared/actions/Post/getInitialLikeState";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Post | MiUDC",
  description: "Post details",
};

interface Props {
  params: {
    postSlug: string;
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params.postSlug;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const initComments = await paginateComments(3, 0, post.id);

  const session = await auth();
  const userId = session?.user?.id || "";

  const likeState = await getInitialLikeState(slug, userId);

  const heartCount = likeState.success
    ? likeState.likeCount ?? 0
    : post._count.PostLike;
  const initialLikedState = likeState.success
    ? likeState.isLiked ?? false
    : false;

  return (
    <div className="flex flex-col items-center">
      <BackButton />

      <div className="flex justify-center items-center px-2">
        <Card className="w-svw max-w-lg mt-16 px-1 md:px-4 space-y-4 pb-4 mb-2">
          <div className="w-full top-0 pt-5 p-3 flex justify-left items-center gap-6">
            <h2 className="pt-16 max-w-2xl mb-4 text-3xl font-extrabold text-green tracking-tight leading-none md:text-4xl xl:text-5xl">
              {postTypeHumanized[post.type]}
            </h2>
          </div>
          <Post
            key={post.id}
            userId={userId}
            postType={post.type}
            postSlug={post.slug}
            postTitle={post.title}
            content={post.content}
            userPhotoUrl={post.author.image ?? ""}
            userName={post.author.username ?? "No name"}
            careerName={post.career.name}
            careerSlug={post.career.slug}
            repliesCount={post._count.children}
            heartCount={heartCount}
            initialLikedState={initialLikedState}
            imageUrls={post.images.map(({ url }) => url)}
            createdAt={post.createdAt}
            authorId={post.authorId}
          />

          <Card className="p-6">
            <div className="w-full top-0 pt-5 p-3 flex justify-left items-center gap-6">
              <h2 className="max-w-2xl mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
                Comentarios
              </h2>
            </div>
            <CommentsList postId={post.id} initComments={initComments} />
          </Card>
        </Card>
      </div>
    </div>
  );
}
