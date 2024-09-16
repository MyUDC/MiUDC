//src\shared\actions\Post\createPost.ts
import prisma from "@/lib/prisma";
import { PostType } from "@prisma/client";

interface CreatePostInput {
  type: PostType;
  title: string;
  content: string;
  authorId: string;
  careerId: string;
  imageUrls: string[];
}

export default async function createPost(input: CreatePostInput) {
  const { type, title, content, authorId, careerId, imageUrls } = input;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug: generateSlug(title),
        type,
        author: { connect: { id: authorId } }, // Asegúrate de que este ID es correcto
        career: { connect: { id: careerId } },
        images: {
          create: imageUrls.map((url) => ({
            url,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return newPost;
  } catch (error) {
    console.error("Error al crear el post:", error);
    throw new Error("No se pudo crear el post");
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
