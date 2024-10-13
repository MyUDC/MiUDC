import paginatePosts from "@/shared/actions/Post/paginatePosts";
import { AppBar } from "@/shared/components/AppBar";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import SearchBar from "@/shared/components/SearchBar";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "MiUDC | Home",
  description: "Home page",
};

export default async function HomePage() {
  const initPosts = await paginatePosts(4, 0);

  return (
    <div className="flex justify-center items-center">
      <AppBar />
      <Card className="max-w-lg mt-20 pb-2">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-full mt-2 px-2">
            <SearchBar />
          </div>
          <div className="w-svw sm:max-w-lg mt-4">
            <PostList
              initPosts={initPosts}
              paginateHandler={async (take: number, skip: number) => {
                "use server";
                return await paginatePosts(take, skip);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
