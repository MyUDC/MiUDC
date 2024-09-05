import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import paginatePostByUser from "@/shared/actions/Post/paginatePostByUser";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserRepliesPage({ params }: Props) {
  let { username } = params;
  username = decodeURIComponent(username);
  const user = await getUserByUsername(username);

  const initPosts = await paginatePostByUser(4, 0, user!.id, "REPLY");

  // Verificar si el usuario tiene respuestas
  if (initPosts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
          No hay respuestas que mostrar
        </h1>
        <p className="max-w-2xl mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          Una vez que hagan, esas respuestas se mostrarán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-svw sm:max-w-lg ">
        <PostList
          initPosts={initPosts}
          paginateHandler={async (take: number, skip: number) => {
            "use server";
            return await paginatePostByUser(take, skip, user!.id, "REPLY");
          }}
        />
      </div>
    </div>
  );
}
