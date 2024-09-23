"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function getCareers() {
  return prisma.career.findMany(
    {
      select: {
        id: true,
        name: true
      }
    }
  );
}

export type Career = Prisma.CareerGetPayload<{
  select: {
    id: true,
    name: true
  }
}>