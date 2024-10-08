"use server";

import prisma from "@/lib/prisma";

export default async function paginateComments(
  take: number,
  skip: number,
  postId: string
) {
  const comments = await prisma.post.findMany({
    where: {
      parentId: postId,
    },
    include: {
      author: { select: { name: true, image: true, username: true } },
      career: { select: { name: true, slug: true } },
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
}
