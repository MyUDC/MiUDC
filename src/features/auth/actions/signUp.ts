'use server';

import prisma from "@/lib/prisma";
import { ResponseSchema } from "@/shared/types/ResponseSchema";
import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

interface Props {
  email: string;
  password: string;
  username: string;
  role: Role;
  careerId?: string | null;
  semester?: number | null;
  accountNumber?: number | null; 
}

export const SignUp = async ({
  email,
  password,
  username,
  role,
  careerId,
  semester,
  accountNumber
}: Props): Promise<ResponseSchema> => {

  // validations
  if (await isEmailInUse(email)) return {
    ok: false,
    message: "El correo ya está en uso"
  }

  if (await isUsernameInUse(username)) return {
    ok: false,
    message: "El nombre de usuario ya está en uso"
  }

  if(role === Role.STUDENT && getEmailDomain(email) !== "ucol.mx" ) return {
    ok: false,
    message: "El correo debe pertenecer a la Universidad de Colima"
  }


  // create user
  try {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username,
        role: role,
        password: bcryptjs.hashSync(password),
        careerId: careerId,
        semester: semester,
        accountNumber: accountNumber
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
        data: user,
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

const isEmailInUse = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase()
    }
  });

  return user;
}

const isUsernameInUse = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });

  return user;
}

// function to obtain domain from email
const getEmailDomain = (email: string) => {
  return email.split('@')[1];
}