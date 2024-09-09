"use server";

import prisma from "@/lib/prisma";

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