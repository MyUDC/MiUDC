'use server';

import prisma from "@/lib/prisma";

const getUserByUsername = async (username: string) => {

  return await prisma.user.findUnique({
    where: {
      username
    }
  });
}

export default getUserByUsername;