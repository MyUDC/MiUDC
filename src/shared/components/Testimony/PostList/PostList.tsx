"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostWithRelations } from "@/shared/types/PostWithRelations";
import paginateTestimony from "@/shared/actions/Post/paginatePosts";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";
import { Refresh } from "./Refresh";
import { ReleaseRefresh } from "./ReleaseRefresh";
import { useRouter } from "next/navigation";
import Post from "../Post";

interface Props {
  paginateHandler: (take: number, skip: number) => Promise<PostWithRelations[]>;
  initPosts: PostWithRelations[];
}

export const PostList = ({ initPosts, paginateHandler }: Props) => {
  const router = useRouter();

  const [testimonies, setTestimonies] = useState<PostWithRelations[]>(initPosts)
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   console.log(testimonies);
  // }, [testimonies])
  

  return (
      <InfiniteScroll
        hasMore={hasMore}
        dataLength={testimonies.length}
        pullDownToRefresh
        pullDownToRefreshContent={<Refresh />}
        releaseToRefreshContent={<ReleaseRefresh />}
        pullDownToRefreshThreshold={100}
        loader={<p>sasassssssssss</p>}
        endMessage={<EndMessage />}
        refreshFunction={async () => {
          setTestimonies(await paginateHandler(4, 0));
        }}
        next={async () => {
          const newTestimonies = await paginateHandler(4, testimonies.length)
          if (!newTestimonies.length) setHasMore(false);
          setTestimonies(testimonies.concat(...newTestimonies));
        }}
      >
        {testimonies.map((post) => {
          return (
            <Post
              key={post.id}
              postType={post.type}
              postSlug={post.slug}
              postTitle={post.title}
              content={post.content}
              userPhotoUrl={post.author.image ?? ""}
              userName={post.author.name ?? "no name"}
              careerName={post.career.name}
              careerSlug={post.career.slug}
              repliesCount={post._count.children}
              heartCount={post._count.PostLike}
              imageUrls={post.images.map(({ url }) => (url))}
              createdAt={post.createdAt}
            />
          )
        })}
      </InfiniteScroll>
  )
}
