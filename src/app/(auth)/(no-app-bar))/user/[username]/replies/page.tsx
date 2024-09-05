import getUserByUsername from "@/features/auth/actions/getUserByUsername";
import paginatePostByUser from "@/shared/actions/Post/paginatePostByUser";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserRepliesPage({params}: Props) {
  let { username } = params;
  username = decodeURIComponent(username);
  
  const user = await getUserByUsername(username);
  
  
  const initPosts = await paginatePostByUser(4, 0, user!.id, 'REPLY');

  return (
    <div className="flex justify-center">
      <div className="w-svw sm:max-w-lg ">
        <PostList
          initPosts={initPosts}
          paginateHandler={async (take: number, skip: number) => {
            'use server';
            return await paginatePostByUser(take, skip, user!.id, 'REPLY');
          }}
        />
      </div>
    </div>
  );
}