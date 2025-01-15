import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import paginatePostByUser from "@/shared/actions/Post/paginatePostByUser";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserTestimoniesPage({ params }: Props) {
  const { username } = params;
  const user = await getUserByUsername(username);

  const initPosts = await paginatePostByUser(4, 0, user!.id, "TESTIMONY");

  // Verificar si el usuario tiene testimonios
  if (initPosts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold text-black tracking-tight leading-none md:text-4xl xl:text-5xl">
          No hay testimonios que mostrar
        </h1>
        <p className="max-w-2xl mb-8 mt-1 text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
          Una vez que hagan, esos testimonios se mostrarán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-svw sm:max-w-5xl">
        <PostList
          initPosts={initPosts}
          paginateHandler={async (take: number, skip: number) => {
            "use server";
            return await paginatePostByUser(take, skip, user!.id, "TESTIMONY");
          }}
        />
      </div>
    </div>
  );
}
