"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

export async function saveCareer(careerId: string) {
  // Autenticación
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    console.log(`User ID: ${userId}, Career ID: ${careerId}`);

    // Verificar si el usuario existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      console.error(`User with ID ${userId} does not exist.`);
      throw new Error("Invalid user ID.");
    }

    // Verificar si la carrera existe
    const careerExists = await prisma.career.findUnique({
      where: { id: careerId },
    });

    if (!careerExists) {
      console.error(`Career with ID ${careerId} does not exist.`);
      throw new Error("Invalid career ID.");
    }

    // Buscar si la carrera ya está guardada por el usuario
    const existingSavedCareer = await prisma.savedCareer.findUnique({
      where: {
        userId_careerId: {
          userId: userId,
          careerId: careerId,
        },
      },
    });

    if (existingSavedCareer) {
      // Si la carrera ya está guardada, eliminarla
      await prisma.savedCareer.delete({
        where: {
          userId_careerId: {
            userId: userId,
            careerId: careerId,
          },
        },
      });
      console.log(`Career ${careerId} unsaved for user ${userId}.`);
    } else {
      // Si la carrera no está guardada, crearla
      await prisma.savedCareer.create({
        data: {
          userId: userId,
          careerId: careerId,
        },
      });
      console.log(`Career ${careerId} saved for user ${userId}.`);
    }

    // Revalidar la ruta para reflejar los cambios
    revalidatePath(`/career/${careerId}`);

    return;
  } catch (error) {
    console.error("Error saving career:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
  }
}
