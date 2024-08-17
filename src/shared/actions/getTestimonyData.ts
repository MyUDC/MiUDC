"use server"

import prisma from "@/lib/prisma";

export default async function getTestimonyData(testimonyId: string) {

  return await prisma.testimony.findUnique({
    where: { id: testimonyId },
    include: {
      user: { select: { name: true, image: true, } },
      career: { select: { name: true } },
      _count: { select: { Comments: true, TestimonyLike: true } },
    }
  });
}