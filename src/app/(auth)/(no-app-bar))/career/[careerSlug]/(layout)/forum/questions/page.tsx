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
      {initQuestions.length === 0
        ? (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl text-gray-500">No hay preguntas</h1>
          </div>
        )
        : (
          <PostList
            initPosts={initQuestions}
            paginateHandler={async (take: number, skip: number) => {
              'use server';
              return await paginateCareerPosts(take, skip, career?.id!, 'QUESTION');
            }}
          />
        )
      }
    </div>
  );
}