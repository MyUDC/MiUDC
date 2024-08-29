import { PostListWraper } from "@/features/home/components/PostListWraper";
import paginatePosts from "@/shared/actions/Post/paginatePosts";
import paginateTestimonies from "@/shared/actions/Post/paginatePosts";
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
      <PostListWraper initPosts={initPosts}/>
    </div>
  );
}
