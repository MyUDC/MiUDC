"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const parentId = formData.get("parentId") as string | null;
  const userId = formData.get("userId") as string;

  if (!content || !postId || !userId) {
    return { error: "Missing required fields" };
  }

  try {
    const comment = await prisma.post.create({
      data: {
        content,
        type: "REPLY",
        title: "",
        slug: `reply-${Date.now()}`,
        authorId: userId,
        parentId: parentId || postId,
        careerId:
          (
            await prisma.post.findUnique({
              where: { id: postId },
              select: { careerId: true },
            })
          )?.careerId || "",
      },
      include: {
        author: { select: { name: true, image: true, username: true } },
        career: { select: { name: true, slug: true } },
        _count: { select: { children: true, PostLike: true } }
      },
    });

    revalidatePath(`/career/[careerSlug]/post/[postSlug]`);
    return { success: true, comment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { error: `Failed to create comment` };
  }
}
