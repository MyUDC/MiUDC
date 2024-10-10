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
import Link from "next/link";
import PostList from "@/shared/components/Testimony/PostList/PostList";

interface Props {
  params: {
    postSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const post = await getPostBySlug(params.postSlug);
  if (!post) notFound();

  const images = post.images.map(({ url }) => ({
    url: url
  }));

  return {
    title: "MiUdc | " + (
      post.title
        ? `${postTypeHumanized[post.type]} - ${post.title}`
        : `${postTypeHumanized[post.type]} en ${post.parent?.title}`
    ),
    description: post.title,
    openGraph: {
      title: "MiUdc | " + (
        post.title
          ? `${postTypeHumanized[post.type]} - ${post.title}`
          : `${postTypeHumanized[post.type]} en ${post.parent?.title}`
      ),
      description: post.title,
      type: "article",
      url: `${process.env.NEXT_SERVER_DOMAIN}/career/${post.career.slug}/post/${post.slug}`,
      images,
      siteName: "MiUDC",
    }
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params.postSlug;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const postParent = await getPostBySlug(post.parent?.slug!);
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

      <div className="flex flex-col items-center justify-center max-w-lg w-full">

        {/* parent card */}
        <Card className="p-6 space-y-4">
          {postParent && (
            <Card className="py-2 px-4">
              <h2 className="text-base">
                {"Respuesta a "}
                <Link
                  className="text-green"
                  href={`/user/${postParent.author.username}`}>
                  @{postParent.author.username}
                </Link>
                {" en:"}
              </h2>
              <Link className="text-green" href={`/career/${postParent.career.slug}/post/${postParent.slug}`}>
                {postParent.title || postParent.slug}
              </Link>
            </Card>
          )}

          {/* Post Type */}
          <div className="w-full pt-4 top-0 px-3 flex justify-left items-center">
            <h2 className="max-w-2xl text-3xl font-bold text-green tracking-tight leading-none md:text-4xl xl:text-5xl">
              {postTypeHumanized[post.type]}
            </h2>
          </div>

          {/* Post card */}
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

          {/* Comments card */}
          <Card className="px-6">
            {/* Title */}
            <div className="w-full top-0 pt- p-3 flex justify-left items-center gap-6">
              <h2 className="max-w-2xl text-xl font-semibold text-black tracking-tight leading-none md:text-2xl xl:text-3xl">
                Comentarios
              </h2>
            </div>

            {/* Comments List */}
            <PostList
              initPosts={initComments}
              paginateHandler={async (take: number, skip: number) => {
                "use server";
                return await paginateComments(take, skip, post.id);
              }}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
}
