// src/features/career-catalog/types/Career.ts
import { Career as PrismaCareer, Faculty } from "@prisma/client";

export type Career = PrismaCareer & {
  faculty: Faculty;
  tags: string[];
};
