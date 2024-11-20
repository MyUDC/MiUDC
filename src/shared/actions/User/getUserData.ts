"use server";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function getUserData(userId: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        name: true,
        careerId: true,
        role: true,
        career: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        semester: true,
        accountNumber: true,
        createdAt: true,
      },
    });

    if (!userData) {
      console.log("User not found:", userId);
      return { error: "User not found" };
    }

    // Si el usuario es ASPIRANT, retornamos sin error pero sin datos de carrera
    if (userData.role === Role.ASPIRANT) {
      return {
        user: userData,
        career: null,
        debugInfo: `User ID: ${userData.id}, Role: ASPIRANT`,
      };
    }

    // Para STUDENT, verificamos que tenga carrera asignada
    if (userData.role === Role.STUDENT && !userData.career) {
      console.log(
        "Career not found for STUDENT:",
        userId,
        "CareerId:",
        userData.careerId
      );
      return {
        user: userData,
        error: "Career not found for STUDENT",
        careerId: userData.careerId,
      };
    }

    return {
      user: userData,
      career: userData.career,
      debugInfo: `User ID: ${userData.id}, Role: ${userData.role}, Career ID: ${userData.careerId}, Career Name: ${userData.career?.name}`,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      error: "Error fetching user data",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
