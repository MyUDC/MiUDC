import getUserByUsername from "@/features/user/actions/getUserByUsername";
import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export default async function getPostByUsername(username: string, postType: PostType) {
  const user = await getUserByUsername(username);
  if (!user) return [];

  return await prisma.post.findMany({
    where: {
      authorId: user.id,
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