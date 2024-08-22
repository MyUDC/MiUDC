import prisma from '@/lib/prisma';
import Testimony from '../../components/Testimony/Testimony';

export default async function saveTestimony(
  title: string,
  content: string,
  authorId: string,
  careerId: string, 
  imageUrls: string[] 
) {
  prisma.testimony.create({
    data: {
      title,
      content,
      careerId,
      userId: authorId,
      images: {
        createMany: {
          
        }
      }
    }
  })
}