"use server";

import prisma from "@/lib/prisma";

export default async function paginateTestimonies(take: number, skip: number) {
  const testimonies = await prisma.testimony.findMany({
    include: {
      user: { select: { name: true, image: true, } },
      career: { select: { name: true, slug: true } },
      _count: { select: { Comments: true, TestimonyLike: true } },
    },
    skip,
    take,
  });

  return testimonies.sort(() => Math.random() - 0.5)
}