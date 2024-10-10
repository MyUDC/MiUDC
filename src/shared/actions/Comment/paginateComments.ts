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
      parent: {
        select: {
          title: true,
          slug: true,
          author: { select: { username: true } },
          career: { select: { name: true, slug: true } }
        }
      },
      author: { select: { name: true, image: true, username: true } },
      images: { select: { url: true, altText: true } },
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments;
}
