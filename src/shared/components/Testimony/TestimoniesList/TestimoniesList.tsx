"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { TestimonyWithRelations } from "@/shared/types/TestimonyWithRelations";
import paginateTestimony from "@/shared/actions/paginateTestimonies";
import TestimonyComponent from "../Testimony";
import { Loading } from "./Loading";
import { EndMessage } from "./EndMessage";

interface Props {
  initTestimonies: TestimonyWithRelations[];
}

export const TestimoniesList = ({ initTestimonies }: Props) => {

  const [testimonies, setTestimonies] = useState(initTestimonies)
  const [hasMore, setHasMore] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <InfiniteScroll
        hasMore={hasMore}
        next={async () => {
          const newTestimonies = await paginateTestimony(3, testimonies.length)
          if (!newTestimonies.length) setHasMore(false);
          setTestimonies(testimonies.concat(...newTestimonies));
        }}
        loader={<Loading />}
        endMessage={<EndMessage />}
        dataLength={testimonies.length}
      >
        {testimonies.map((testimony) => {
          return (
            <TestimonyComponent
              key={testimony.id}
              createdAt={testimony.createdAt}
              content={testimony.content}
              commentCount={testimony._count.Comments}
              heartCount={testimony._count.TestimonyLike}
              career={testimony.career.name}
              userName={testimony.user.name ?? "no name"}
              userPhotoUrl={testimony.user.image ?? ""}
            />
          )
        })}
      </InfiniteScroll>
    </div >
  )
}
