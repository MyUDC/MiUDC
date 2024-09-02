"use server";

import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export default async function paginateCareerPosts(take: number, skip: number, careerId: string, postType: PostType) {
  const testimonies = await prisma.post.findMany({
    where: {
      careerId,
      type: postType
    },
    include: {
      author: { select: { name: true, image: true, } },
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