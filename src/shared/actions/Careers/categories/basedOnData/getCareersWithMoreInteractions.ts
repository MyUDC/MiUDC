"use server";

import prisma from "@/lib/prisma";

type CareerWithInteractions = {
  id: string;
  name: string;
  slug: string;
  faculty: {
    name: string;
  };
  Posts: {
    PostLike: {
      id: string;
    }[];
  }[];
};

export async function getCareersWithMoreInteractions(limit: number = 5) {
  const careersWithInteractions = (await prisma.career.findMany({
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
        select: {
          PostLike: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })) as CareerWithInteractions[];

  const careersWithInteractionCounts = careersWithInteractions.map(
    (career) => ({
      id: career.id,
      name: career.name,
      slug: career.slug,
      faculty: career.faculty.name,
      interactionsCount: career.Posts.reduce(
        (acc, post) => acc + post.PostLike.length,
        0
      ),
    })
  );

  const sortedCareers = careersWithInteractionCounts.sort(
    (a, b) => b.interactionsCount - a.interactionsCount
  );

  return sortedCareers.slice(0, limit);
}
