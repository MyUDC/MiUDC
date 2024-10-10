import { Prisma } from '@prisma/client'

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    parent: {
      select: {
        title: true,
        slug: true,
        author: { select: { username: true } },
        career: { select: { name: true, slug: true } }
      }
    },
    author: { select: { name: true, image: true, username: true } },
    images: { select: { url: true, altText: true } },
    career: { select: { name: true, slug: true } },
    _count: { select: { children: true, PostLike: true } },
  }
}>