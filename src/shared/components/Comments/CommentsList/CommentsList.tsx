"use client";

import { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import paginateComments from "@/shared/actions/Comment/paginateComments";
import { CommentWithRelations } from "@/shared/types/CommentWithRelations";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";
import Comment from "../Comment"

interface Props {
  testimonyId: string;
  initComments: CommentWithRelations[];
}

export const CommentsList = ({ initComments, testimonyId }: Props) => {

  const [comments, setComments] = useState(initComments)
  const [hasMore, setHasMore] = useState(true);

  return (
    <div className="w-full">
      <InfiniteScroll
        className="w-full"
        hasMore={hasMore}
        dataLength={comments.length}
        loader={<Loading />}
        endMessage={<EndMessage />}
        next={async () => {
          const newComments = await paginateComments(3, comments.length, testimonyId)
          if (!newComments.length) setHasMore(false);
          setComments(comments.concat(...newComments));
        }}
      >
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              authorData={{
                name: comment.author.name ?? 'no name',
                photoUrl: comment.author.image ?? '',
                username: comment.author.username,
              }}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          )
        })}
      </InfiniteScroll>
    </div >
  )
}
