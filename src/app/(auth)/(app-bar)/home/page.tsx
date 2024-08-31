import paginatePosts from "@/shared/actions/Post/paginatePosts";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Home page",
};

export default async function HomePage() {

  const initPosts = await paginatePosts(4, 0)

  return (
    <div className="flex justify-center">
      <PostList
        initPosts={initPosts}
        paginateHandler={async (take: number, skip: number) => {
          'use server';
          return await paginatePosts(take, skip);
        }}
      />
    </div>
  );
}
