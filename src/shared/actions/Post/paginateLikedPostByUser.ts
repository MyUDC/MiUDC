import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export default async function paginateLikedPostsByUser(
  take: number,
  skip: number,
  userId: string,
  postTypes: PostType[]
) {
  return await prisma.post.findMany({
    take,
    skip,
    where: {
      PostLike: {
        some: {
          userId: userId,
        },
      },
      type: {
        in: postTypes,
      },
    },
    include: {
      author: { select: { name: true, image: true, username: true } },
      images: { select: { url: true, altText: true } },
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    },
  });
}
