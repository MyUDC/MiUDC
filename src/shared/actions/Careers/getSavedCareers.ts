// src/shared/actions/Careers/getSavedCareers.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Career, Prisma } from "@prisma/client";

export async function getSavedCareers(): Promise<
  (Career & { faculty: any; tags: string[] })[]
> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  try {
    const savedCareers = await prisma.savedCareer.findMany({
      where: {
        userId: userId,
      },
      include: {
        career: {
          include: {
            faculty: true,
            CareerTag: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
    });

    return savedCareers.map((sc) => ({
      ...sc.career,
      faculty: sc.career.faculty,
      tags: sc.career.CareerTag.map((ct) => ct.tag.name),
    }));
  } catch (error) {
    console.error("Error fetching saved careers:", error);
    return [];
  }
}
