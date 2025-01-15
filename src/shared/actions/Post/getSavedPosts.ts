"use server";

import prisma from "@/lib/prisma";

export async function getSavedPosts(userId: string) {
  try {
    const savedPosts = await prisma.savedPost.findMany({
      where: { userId: userId },
      include: {
        post: {
          include: {
            author: true,
            career: true,
            images: true,
            _count: {
              select: { children: true },
            },
          },
        },
      },
    });

    return { success: true, savedPosts };
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return { success: false, error: "Failed to fetch saved posts" };
  }
}
