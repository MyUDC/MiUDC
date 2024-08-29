"use server";

import prisma from "@/lib/prisma";

export default async function getPostWithRelations(testimonyId: string) {

  return await prisma.post.findUnique({
    where: { id: testimonyId },
    include: {
      author: { select: { name: true, image: true, } },
      images: { select: { url: true, altText: true }},
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    }
  });
}