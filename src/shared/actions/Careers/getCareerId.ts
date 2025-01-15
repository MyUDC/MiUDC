"use server";

import prisma from "@/lib/prisma";

export async function getCareerId(slug: string): Promise<string | null> {
  try {
    const career = await prisma.career.findUnique({
      where: { slug },
      select: { id: true },
    });

    return career?.id ?? null;
  } catch (error) {
    console.error("Error fetching career ID:", error);
    return null;
  }
}
