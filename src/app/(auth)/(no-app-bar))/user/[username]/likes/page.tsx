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

  // Verificar si el usuario tiene publicaciones que le gustan
  if (initLikedPosts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
          No hay publicaciones que le gusten
        </h1>
        <p className="max-w-2xl mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          Una vez que le gusten algunas publicaciones, se mostrarán aquí.
        </p>
      </div>
    );
  }

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
