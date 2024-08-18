"use server";

import prisma from "@/lib/prisma";

export default async function paginateComments(take: number, skip: number, testimonyId: string) {
  const testimonies = await prisma.comment.findMany({
    where: {
      testimonyId
    },
    include: {
      user: { select: { name: true, image: true, } },
    },
    skip,
    take,
  });

  return testimonies.sort(() => Math.random() - 0.5)
}