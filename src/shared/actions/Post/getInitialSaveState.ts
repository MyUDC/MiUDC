"use server";

import prisma from "@/lib/prisma";

export async function getInitialSaveState(postSlug: string, userId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      include: {
        savedBy: {
          where: { userId: userId },
        },
      },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const isSaved = post.savedBy.length > 0;

    return { success: true, isSaved };
  } catch (error) {
    console.error("Error getting initial save state:", error);
    return { success: false, error: "Failed to get initial save state" };
  }
}
