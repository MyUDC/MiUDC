"use client";

import { useState } from "react";
import { type Testimony } from "@prisma/client";
import InfiniteScroll from "react-infinite-scroll-component";

import paginateTestimony from "@/shared/actions/paginateTestimonies";
import { Loading } from "./Loading";
import TestimonyComponent from "../Testimony";

interface Props {
  initTestimonies: Testimony[];
}

export const TestimoniesList = ({ initTestimonies }: Props) => {

  const [testimonies, setTestimonies] = useState(initTestimonies)

  return (
    <div className="flex flex-col items-center">
      <InfiniteScroll
        hasMore
        next={() => {
          setTimeout(async () => {
            const newTestimonies = await paginateTestimony(3, testimonies.length)
            setTestimonies(testimonies.concat(...newTestimonies));
          }, 3000);
        }}
        loader={<Loading />}
        dataLength={testimonies.length}
      >
        {testimonies.map((testimony: Testimony) => (
          <TestimonyComponent
            key={testimony.id}
            createdAt={testimony.createdAt}
            content={testimony.content}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
