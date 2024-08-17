"use server";

import prisma from "@/lib/prisma";

export default async function paginateTestimonies(take: number, skip: number) {
  return prisma.testimony.findMany({
    skip,
    take
  })
}