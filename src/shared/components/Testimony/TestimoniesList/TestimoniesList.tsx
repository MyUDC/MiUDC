"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostWithRelations } from "@/shared/types/PostWithRelations";
import paginateTestimony from "@/shared/actions/Testimony/paginatePosts";
import TestimonyComponent from "../Testimony";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";
import { Refresh } from "./Refresh";
import { ReleaseRefresh } from "./ReleaseRefresh";

interface Props {
  initTestimonies: PostWithRelations[];
}

export const TestimoniesList = ({ initTestimonies }: Props) => {

  const [testimonies, setTestimonies] = useState(initTestimonies)
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
            <TestimonyComponent
              key={post.id}
              testimonySlug={post.slug}
              createdAt={post.createdAt}
              content={post.content}
              commentCount={post._count.children}
              heartCount={post._count.PostLike}
              careerData={{
                name: post.career.name,
                slug: post.career.slug
              }}
              userName={post.author.name ?? "no name"}
              // userPhotoUrl={post.author.image ?? ""}
              // todo: refactor to delete map
              imageUrls={post.images.map(({url}) => (url))}
            />
          )
        })}
      </InfiniteScroll>
    </div >
  )
}
