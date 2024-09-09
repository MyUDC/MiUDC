import prisma from "@/lib/prisma";

export default async function getPostBySlug(slug: string) {

  return await prisma.post.findUnique({
    where: {
      slug
    },
    include: {
      author: { select: { name: true, image: true, username: true } }, images: { select: { url: true, altText: true } },
      career: { select: { name: true, slug: true } },
      _count: { select: { children: true, PostLike: true } },
    }
  })
}