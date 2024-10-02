"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdatePostInput {
  postSlug: string;
  title: string;
  content: string;
  path: string;
}

export async function updatePost(input: UpdatePostInput) {
  const { postSlug, title, content, path } = input;
  try {
    const post = await prisma.post.findUnique({ where: { slug: postSlug } });
    if (!post) {
      return { success: false, error: "Post not found" };
    }
    const updatedPost = await prisma.post.update({
      where: { slug: postSlug },
      data: { title, content },
    });
    revalidatePath(path);
    return { success: true, post: updatedPost };
  } catch (error) {
    console.error("Error in updatePost:", error);
    return { success: false, error: "Could not update the post" };
  }
}
