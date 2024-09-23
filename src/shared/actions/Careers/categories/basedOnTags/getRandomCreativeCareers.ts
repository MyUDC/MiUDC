"use server";

import prisma from "@/lib/prisma";

const creativeTags = [
  "Música",
  "Pensamiento",
  "Humanidades",
  "Creatividad",
  "Arte",
  "Danza",
  "Literatura",
];

export async function getRandomCreativeCareers(limit: number = 5) {
  const creativeCareerIds = await prisma.career.findMany({
    where: {
      CareerTag: {
        some: {
          tag: {
            name: {
              in: creativeTags,
            },
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  const randomCareerIds = creativeCareerIds
    .map((career) => career.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);

  const randomCreativeCareers = await prisma.career.findMany({
    where: {
      id: {
        in: randomCareerIds,
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
  });

  return randomCreativeCareers.map((career) => ({
    id: career.id,
    name: career.name,
    slug: career.slug,
    faculty: career.faculty.name,
    creativeTags: career.CareerTag.map((ct) => ct.tag.name).filter((tag) =>
      creativeTags.includes(tag)
    ),
  }));
}
