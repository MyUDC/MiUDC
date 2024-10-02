"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(postSlug: string, path: string) {
  try {
    const post = await prisma.post.findUnique({ where: { slug: postSlug } });
    if (!post) {
      return { success: false, error: "Post not found" };
    }
    await prisma.post.delete({ where: { slug: postSlug } });
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error in deletePost:", error);
    return { success: false, error: "Could not delete the post" };
  }
}
