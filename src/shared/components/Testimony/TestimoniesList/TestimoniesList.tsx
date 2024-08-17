"use client";

import { useState } from "react";
import { type Testimony } from "@prisma/client";
import InfiniteScroll from "react-infinite-scroll-component";

import paginateTestimony from "@/shared/actions/paginateTestimonies";
import { Loader } from "./Loader";

interface Props {
  initTestimonies: Testimony[];
}

export const TestimoniesList = ({ initTestimonies }: Props) => {

  const [testimonies, setTestimonies] = useState(initTestimonies)

  return (
    <InfiniteScroll
      hasMore
      next={() => {
        setTimeout(async () => {
          const newTestimonies = await paginateTestimony(3, testimonies.length)
          setTestimonies(testimonies.concat(...newTestimonies));
        }, 3000);
      }}
      loader={<Loader/>}
      dataLength={testimonies.length}
    >
      {
        testimonies.map((testimony: Testimony) => (
          <div className="h-[500px] m-2 bg-slate-400" key={testimony.id}>{testimony.title}</div>
        ))
      }
    </InfiniteScroll>
  )
}
