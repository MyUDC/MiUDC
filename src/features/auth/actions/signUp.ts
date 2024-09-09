'use server';

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

export const SignUp = async (email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        role: Role.STUDENT
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    })

    return (
      {
        ok: true,
        user: user,
        message: "Usuario creado correctamente"
      }
    )
  } catch (error) {
    console.log(error);
    
    return {
      ok: false,
      message: "Error al crear el usuario"
    }
  }
}