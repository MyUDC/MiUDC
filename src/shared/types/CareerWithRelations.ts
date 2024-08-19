import { Prisma } from '@prisma/client'

export type CareerWithRelations = Prisma.CareerGetPayload<{
  include: {
    faculty: {
      select: {
        name: true
      }
    },
  }
}>