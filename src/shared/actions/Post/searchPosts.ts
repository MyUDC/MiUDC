// src/shared/actions/Post/searchPosts.ts
"use server";

import prisma from "@/lib/prisma";

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { content: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        author: { select: { name: true, image: true, username: true } },
        images: { select: { url: true, altText: true } },
        career: { select: { name: true, slug: true } },
        _count: { select: { children: true, PostLike: true } },
      },
      take: 10, // Limitar a 10 resultados
    });

    return posts;
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}
