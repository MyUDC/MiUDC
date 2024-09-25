"use server";

import prisma from "@/lib/prisma";

export async function getCareersBasedOnTags(tags: string[], limit: number = 5) {
  const careers = await prisma.career.findMany({
    where: {
      CareerTag: {
        some: {
          tag: {
            name: {
              in: tags,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      faculty: {
        select: {
          name: true,
        },
      },
      CareerTag: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    take: limit,
  });

  return careers.map((career) => ({
    id: career.id,
    name: career.name,
    slug: career.slug,
    faculty: career.faculty.name,
    tags: career.CareerTag.map((ct) => ct.tag.name),
  }));
}
