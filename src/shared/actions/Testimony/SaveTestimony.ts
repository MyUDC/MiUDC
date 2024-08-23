"use server";

import prisma from '@/lib/prisma';
import { generateSlug } from '@/utils/generateSlug';

export interface TestimonyData {
  title: string;
  content: string;
  authorId: string;
  careerId: string;
  imageUrls: string[] | [];
}

export default async function saveTestimony({
  title,
  content,
  authorId,
  careerId,
  imageUrls
}: TestimonyData) {
  const data = {
    title,
    content,
    careerId,
    userId: authorId,
    slug: generateSlug(title),
    ...(imageUrls.length > 0 && {
      images: {
        createMany: {
          data: imageUrls.map(url => ({ url }))
        }
      }
    })
  };

  return await prisma.testimony.create({ data });
}