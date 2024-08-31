import { Metadata } from "next";

import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import paginateCareerPosts from "@/shared/actions/Post/PaginateCareerPost";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";

export const metadata: Metadata = {
  title: 'Career Testimonies | MiUDC',
  description: 'All the testimonies of the career',
};

interface Props {
  params: {
    careerSlug: string;
  }
}

export default async function ({ params }: Props) {
  const { careerSlug } = params;
  const career = await getCareerWithRelations(careerSlug);

  const initTestimonies = await paginateCareerPosts(4, 0, career?.id!, 'TESTIMONY');

  return (
    <div>
      <PostList
        initPosts={initTestimonies}
        paginateHandler={async (take: number, skip: number) => {
          'use server';
          return await paginateCareerPosts(take, skip, career?.id!, 'QUESTION');
        }}
      />
    </div>
  );
}