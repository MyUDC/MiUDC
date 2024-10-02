"use server";

import prisma from "@/lib/prisma";

export async function likePost(postSlug: string, userId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      select: { id: true },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const existingLike = await prisma.postLike.findFirst({
      where: {
        PostId: post.id,
        userId: userId,
      },
    });

    if (existingLike) {
      await prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          PostId: post.id,
          userId: userId,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error al procesar el like:", error);
    return { success: false, error: "Error al procesar el like" };
  }
}
