import prisma from "@/lib/prisma";

export default async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username
    }
  });
}