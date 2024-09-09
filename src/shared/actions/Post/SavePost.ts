"use server";

import prisma from '@/lib/prisma';
import { generateSlug } from '@/utils/generateSlug';
import {PostType} from "@prisma/client";

export interface PostData {
  type: PostType; 
  title: string;
  content: string;
  authorId: string;
  careerId: string;
  parentId?: string;
  imageUrls: string[] | [];
}

export default async function SavePost({
  type,
  title,
  content,
  authorId,
  careerId,
  parentId,
  imageUrls
}: PostData) {

  return await prisma.post.create({ data: {
    type,
    title,
    content,
    authorId,
    careerId,
    parentId,
    slug: generateSlug(`${title}-${new Date().getTime()}`),
    ...(imageUrls.length > 0 && {
      images: {
        createMany: {
          data: imageUrls.map(url => ({ url }))
        }
      }
    })
  }});
}