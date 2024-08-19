import prisma from "@/lib/prisma";

export default async function getTestimonyBySlug(slug: string) {

  return await prisma.testimony.findUnique({
    where: {
      slug
    },
    include: {
      user: { select: { name: true, image: true, } },
      images: { select: { url: true, altText: true }},
      career: { select: { name: true, slug: true } },
      _count: { select: { Comments: true, TestimonyLike: true } },
    }
  })
}