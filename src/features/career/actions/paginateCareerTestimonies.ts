"use server";

import prisma from "@/lib/prisma";

export default async function paginateCareerTestimonies(take: number, skip: number, careerId: string) {
  const testimonies = await prisma.post.findMany({
    where: {
      careerId
    },
    include: {
      author: { select: { name: true, image: true, } },
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    },
    skip,
    take,
  });

  return testimonies.sort(() => Math.random() - 0.5)
}