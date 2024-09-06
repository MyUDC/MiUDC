"use server";

import prisma from "@/lib/prisma";

export default async function paginateComments(take: number, skip: number, postId: string) {
  const testimonies = await prisma.post.findMany({
    where: {
      parentId: postId
    },
    include: {
      author: { select: { name: true, image: true, username: true} },
    }
    ,
    skip,
    take,
  });

  return testimonies.sort(() => Math.random() - 0.5)
}