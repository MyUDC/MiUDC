"use server";

import prisma from "@/lib/prisma";

export default async function getCareerWithRelations(slug: string) {
    return await prisma.career.findUnique({
      where: {
        slug
      },
      include: {
        faculty: {
          select: {
            name: true
          }
        },
      }
    });
}

