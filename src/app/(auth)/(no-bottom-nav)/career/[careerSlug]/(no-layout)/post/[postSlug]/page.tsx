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
      <div className="mb-14">
        <BackButton />
      </div>
      <div className="w-full top-0 pt-5 p-3 flex items-center gap-6">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          {postTypeHumanized[post.type]}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center max-w-lg w-full">
        <Post
          key={post.id}
          userId={userId}
          postType={post.type}
          postSlug={post.slug}
          postTitle={post.title}
          content={post.content}
          userPhotoUrl={post.author.image ?? ""}
          userName={post.author.name ?? "no name"}
          careerName={post.career.name}
          careerSlug={post.career.slug}
          repliesCount={post._count.children}
          heartCount={heartCount}
          initialLikedState={initialLikedState}
          imageUrls={post.images.map(({ url }) => url)}
          createdAt={post.createdAt}
          authorId={post.authorId}
        />

        <div className="px-4 pb-4 w-full">
          <h2 className="font-semibold">Comments</h2>
        </div>
        <CommentsList postId={post.id} initComments={initComments} />
      </div>
    </div>
  );
}
