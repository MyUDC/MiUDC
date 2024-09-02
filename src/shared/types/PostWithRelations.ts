import { Prisma } from '@prisma/client'

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: { select: { name: true, image: true, username: true } },
    images: { select: { url: true, altText: true }},
    career: { select: { name: true, slug: true } },
    _count: { select: { children: true, PostLike: true } },
  }
}>