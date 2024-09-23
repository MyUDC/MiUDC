"use server";

import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

export async function getCareersWithMoreTestimonies(limit: number = 5) {
  const careersWithTestimonies = await prisma.career.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      faculty: {
        select: {
          name: true,
        },
      },
      Posts: {
        where: {
          type: PostType.TESTIMONY,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const careersWithTestimoniesCount = careersWithTestimonies.map((career) => ({
    id: career.id,
    name: career.name,
    slug: career.slug,
    faculty: career.faculty.name,
    testimoniesCount: career.Posts.length,
  }));

  const sortedCareers = careersWithTestimoniesCount
    .sort((a, b) => b.testimoniesCount - a.testimoniesCount)
    .slice(0, limit);

  return sortedCareers;
}
