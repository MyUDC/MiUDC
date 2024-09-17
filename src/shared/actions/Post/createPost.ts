"use server";

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

export async function createPost(input: CreatePostInput) {
  const { type, title, content, authorId, careerId, imageUrls } = input;

  let slug = generateSlug(title);

  // Verificar si ya existe un post con el mismo slug
  let slugExists = await prisma.post.findUnique({
    where: { slug },
  });

  // Si ya existe, agregar un sufijo único al slug
  let suffix = 1;
  while (slugExists) {
    slug = `${generateSlug(title)}-${suffix}`;
    slugExists = await prisma.post.findUnique({
      where: { slug },
    });
    suffix++;
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        type,
        author: { connect: { id: authorId } },
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
    console.error("Error en createPost:", error);
    if (error instanceof Error) {
      throw new Error(`No se pudo crear el post: ${error.message}`);
    } else {
      throw new Error("No se pudo crear el post por un error desconocido");
    }
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
