"use client";

import paginatePosts from "@/shared/actions/Post/paginatePosts";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { PostWithRelations } from "@/shared/types/PostWithRelations";
import { Post } from "@prisma/client";

interface Props {
  initPosts: PostWithRelations[];
}

export const PostListWraper = ({initPosts}: Props) => {
  return (
    <div className="w-svw sm:max-w-lg ">
        <PostList
          initPosts={initPosts}
          paginateHandler={async (take: number, skip: number) => {
            return await paginatePosts(take, skip)
          }}
        />
      </div>
  )
}
