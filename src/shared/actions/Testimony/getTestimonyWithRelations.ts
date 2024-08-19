"use server";

import prisma from "@/lib/prisma";

export default async function getTestimonyData(testimonyId: string) {

  return await prisma.testimony.findUnique({
    where: { id: testimonyId },
    include: {
      user: { select: { name: true, image: true, } },
      images: { select: { url: true, altText: true }},
      career: { select: { name: true, slug: true } },
      _count: { select: { Comments: true, TestimonyLike: true } },
    }
  });
}