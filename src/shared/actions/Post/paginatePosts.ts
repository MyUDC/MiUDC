"use server";

import prisma from "@/lib/prisma";

export default async function paginatePosts(take: number, skip: number) {
  const testimonies = await prisma.post.findMany({
    include: {
      author: { select: { name: true, image: true, username: true} },
      images: { select: { url: true, altText: true }},
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    },
    skip,
    take,
    orderBy: {
      updatedAt: "desc"
    }
  });

  return testimonies.sort(() => Math.random() - 0.5)
}