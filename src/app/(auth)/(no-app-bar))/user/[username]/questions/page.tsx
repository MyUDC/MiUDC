import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import paginatePostByUser from "@/shared/actions/Post/paginatePostByUser";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { PostWithRelations } from "@/shared/types/PostWithRelations";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserQuestionsPage({params}: Props) {
  const { username } = params;
  const user = await getUserByUsername(username);
  const initPosts: PostWithRelations[] = await paginatePostByUser(4, 0, user!.id, 'QUESTION');

  if (!initPosts.length) return (
    <h1>no hay</h1>
  ); 

  return (
    <div className="flex justify-center">
      <div className="w-svw sm:max-w-lg ">
        <PostList
          initPosts={initPosts}
          paginateHandler={async (take: number, skip: number) => {
            'use server';
            return await paginatePostByUser(take, skip, user!.id, 'TESTIMONY');
          }}
        />
      </div>
    </div>
  );
}