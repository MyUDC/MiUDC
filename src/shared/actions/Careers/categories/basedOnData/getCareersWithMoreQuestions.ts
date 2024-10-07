"use server";

import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export async function getCareersWithMoreQuestions(limit: number = 5) {
  const careersWithQuestions = await prisma.career.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      faculty: {
        select: {
          name: true,
        },
      },
      Posts: {
        where: {
          type: PostType.QUESTION,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const careersWithQuestionsCount = careersWithQuestions.map((career) => ({
    id: career.id,
    name: career.name,
    slug: career.slug,
    faculty: career.faculty.name,
    questionsCount: career.Posts.length,
  }));

  const sortedCareers = careersWithQuestionsCount
    .sort((a, b) => b.questionsCount - a.questionsCount)
    .slice(0, limit);

  return sortedCareers;
}
