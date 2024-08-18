import { Prisma } from '@prisma/client'

export type CommentWithRelations = Prisma.CommentGetPayload<{
  include: {
    user: { select: { name: true, image: true, } },
  },
}>