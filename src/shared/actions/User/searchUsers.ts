// src/shared/actions/User/searchUsers.ts
"use server";

import prisma from "@/lib/prisma";

export async function searchUsers(searchTerm: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { username: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
      },
      take: 10, // Limitar a 10 resultados
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}