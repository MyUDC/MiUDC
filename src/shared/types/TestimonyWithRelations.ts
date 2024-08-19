import { Prisma } from '@prisma/client'

export type TestimonyWithRelations = Prisma.TestimonyGetPayload<{
  include: {
    user: { select: { name: true, image: true } },
    images: { select: { url: true, altText: true }},
    career: { select: { name: true, slug: true } }
    _count: { select: { Comments: true, TestimonyLike: true } }
  }
}>