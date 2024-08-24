import { Prisma } from '@prisma/client'

export type CommentWithRelations = Prisma.PostGetPayload<{
  include: {
    author: { select: { name: true, image: true, } },
  }
}>