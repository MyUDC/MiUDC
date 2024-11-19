"use server";

import prisma from "@/lib/prisma";

export async function savePost(postSlug: string, userId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: postSlug },
      include: { savedBy: { where: { userId } } },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    if (post.savedBy.length > 0) {
      // Post is already saved, so we'll unsave it
      await prisma.savedPost.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: post.id,
          },
        },
      });
      return { success: true, isSaved: false };
    } else {
      // Post is not saved, so we'll save it
      await prisma.savedPost.create({
        data: {
          userId: userId,
          postId: post.id,
        },
      });
      return { success: true, isSaved: true };
    }
  } catch (error) {
    console.error("Error saving/unsaving post:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "An unexpected error occurred while saving/unsaving the post",
    };
  }
}
