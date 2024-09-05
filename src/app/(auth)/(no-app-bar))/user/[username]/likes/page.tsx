// src/pages/UserLikePage.tsx
import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import paginateLikedPostsByUser from "@/shared/actions/Post/paginateLikedPostByUser";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { PostType } from "@prisma/client";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserLikePage({ params }: Props) {
  const { username } = params;
  const user = await getUserByUsername(username);

  // Definimos los tipos de publicaciones que queremos recuperar
  const postTypes = [PostType.QUESTION, PostType.TESTIMONY, PostType.REPLY];

  const initLikedPosts = await paginateLikedPostsByUser(
    4,
    0,
    user!.id,
    postTypes
  );

  return (
    <div className="flex justify-center">
      <div className="w-svw sm:max-w-lg">
        <PostList
          initPosts={initLikedPosts}
          paginateHandler={async (take: number, skip: number) => {
            "use server";
            return await paginateLikedPostsByUser(
              take,
              skip,
              user!.id,
              postTypes
            );
          }}
        />
      </div>
    </div>
  );
}
