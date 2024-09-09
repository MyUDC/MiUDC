import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export default async function paginatePostByUser(take: number, skip: number, userId: string, postType: PostType) {
  return await prisma.post.findMany({
    take,
    skip,
    where: {
      authorId: userId,
      type: postType,
    },
    include: {
      author: { select: { name: true, image: true, username: true } },
      images: { select: { url: true, altText: true }},
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    }
  });
}