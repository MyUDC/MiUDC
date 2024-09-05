import prisma from "@/lib/prisma";

export default async function getPostsLikedByUser(userId: string) {
  return await prisma.postLike.findMany({
    where: {
      userId,
    },
    include: {
      Post: {
        include: {
          author: { select: { name: true, image: true, username: true } },
          images: { select: { url: true, altText: true } },
          career: { select: { name: true, slug: true } },
          _count: { select: { children: true, PostLike: true } },
        }
      }
    }
  });
}