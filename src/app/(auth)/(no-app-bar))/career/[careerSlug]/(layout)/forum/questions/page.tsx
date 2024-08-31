import { Metadata } from "next";

import getCareerWithRelations from "@/features/career/actions/getCareerWithRelations";
import paginateCareerPosts from "@/shared/actions/Post/PaginateCareerPost";
import { PostList } from "@/shared/components/Testimony/PostList/PostList";

export const metadata: Metadata = {
  title: 'Career Questions | MiUDC',
  description: 'All the questions of the career',
};

interface Props {
  params: {
    careerSlug: string;
  }
}

export default async function ({ params }: Props) {
  const { careerSlug } = params;
  const career = await getCareerWithRelations(careerSlug);

  const initQuestions = await paginateCareerPosts(4, 0, career?.id!, 'QUESTION');

  return (
    <div>
      <PostList
        initPosts={initQuestions}
        paginateHandler={async (take: number, skip: number) => {
          'use server';
          return await paginateCareerPosts(take, skip, career?.id!, 'QUESTION');
        }}
      />
    </div>
  );
}