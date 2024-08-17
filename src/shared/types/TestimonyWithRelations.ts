import { Prisma } from '@prisma/client'

export type TestimonyWithRelations = Prisma.TestimonyGetPayload<{
  include: {
    user: { select: { name: true, image: true } }
    career: { select: { name: true, slug: true } }
    _count: { select: { Comments: true, TestimonyLike: true } }
  }
}>