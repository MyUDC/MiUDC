"use server";

import prisma from "@/lib/prisma";

export async function getUserData(userId: string) {
  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        careerId: true,
        career: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log(
      "Raw user data from Prisma:",
      JSON.stringify(userData, null, 2)
    );

    if (!userData) {
      console.log("User not found:", userId);
      return { error: "User not found" };
    }

    if (!userData.career) {
      console.log(
        "Career not found for user:",
        userId,
        "CareerId:",
        userData.careerId
      );
      return {
        user: userData,
        error: "Career not found",
        careerId: userData.careerId,
      };
    }

    return {
      user: userData,
      career: userData.career,
      debugInfo: `User ID: ${userData.id}, Career ID: ${userData.careerId}, Career Name: ${userData.career.name}`,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      error: "Error fetching user data",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
