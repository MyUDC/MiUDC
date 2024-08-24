"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostWithRelations } from "@/shared/types/PostWithRelations";
import paginateTestimony from "@/shared/actions/Post/paginatePosts";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";
import { Refresh } from "./Refresh";
import { ReleaseRefresh } from "./ReleaseRefresh";
import { PostType } from "@prisma/client";
import Post from '../Post';

interface Props {
  postType: PostType;
  initPosts: PostWithRelations[];
}

export const PostList = ({ initPosts, postType}: Props) => {

  const [testimonies, setTestimonies] = useState(initPosts)
  const [hasMore, setHasMore] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={testimonies.length}
        pullDownToRefresh
        pullDownToRefreshContent={<Refresh />}
        releaseToRefreshContent={<ReleaseRefresh />}
        pullDownToRefreshThreshold={100}
        loader={<Loading />}
        endMessage={<EndMessage />}
        refreshFunction={async () => {
          setTestimonies(await paginateTestimony(3, 0));
        }}
        next={async () => {
          const newTestimonies = await paginateTestimony(3, testimonies.length)
          if (!newTestimonies.length) setHasMore(false);
          setTestimonies(testimonies.concat(...newTestimonies));
        }}
      >
        {testimonies.map((post) => {
          return (
            <Post
              key={post.id}
              postType={post.type}
              postTitle={post.title}
              postSlug={post.slug}
              createdAt={post.createdAt}
              content={post.content}
              repliesCount={post._count.children}
              heartCount={post._count.PostLike}
              careerName={post.career.name}
              careerSlug={post.career.slug}
              userName={post.author.name ?? "no name"}
              // userPhotoUrl={post.author.image ?? ""}
              // todo: refactor to delete map
              imageUrls={post.images.map(({ url }) => (url))}
            />
          )
        })}
      </InfiniteScroll>
    </div >
  )
}
