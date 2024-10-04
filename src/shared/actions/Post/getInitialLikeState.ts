"use server";

import prisma from "@/lib/prisma";

export async function getInitialLikeState(postSlug: string, userId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      select: {
        id: true,
        PostLike: {
          where: { userId: userId },
        },
        _count: {
          select: { PostLike: true },
        },
      },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    return {
      success: true,
      isLiked: post.PostLike.length > 0,
      likeCount: post._count.PostLike,
    };
  } catch (error) {
    console.error("Error al obtener el estado inicial de like:", error);
    return {
      success: false,
      error: "Error al obtener el estado inicial de like",
    };
  }
}
