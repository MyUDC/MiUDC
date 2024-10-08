import { Prisma } from "@prisma/client";

export type CommentWithRelations = Prisma.PostGetPayload<{
  include: {
    author: { select: { name: true; image: true; username: true } };
    career: { select: { name: true; slug: true } };
  };
}> & {
  parentId: string | null;
};
