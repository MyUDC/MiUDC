"use client";

import "swiper/css";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";
import { useCareerStore } from "@/stores/useCareerStore";
import paginateCareerPosts from "@/shared/actions/Post/PaginateCareerPost";
import { useEffect, useState } from "react";

export default function ExperiencesView() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { initialTestimonies, careerId } = useCareerStore(state => ({
    initialTestimonies: state.initialTestimonies,
    careerId: state.careerId,
  }));
  
  useEffect(() => {
    if (initialTestimonies.length === 0) {
      setIsDataLoaded(false);
    } else {
      setIsDataLoaded(true);
    }
  }, [initialTestimonies])

  return (
    <div className="w-svw">
      {isDataLoaded &&
        <PostList
          initPosts={initialTestimonies}
          paginateHandler={async (take: number, skip: number) => {
            return await paginateCareerPosts(take, skip, careerId, "TESTIMONY")
          }}
        />
      }
    </div>
  );
}
