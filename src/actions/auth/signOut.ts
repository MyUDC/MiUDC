'use server';

import { signOut } from "@/auth.config"

export const  SignOut = async () => {
  await signOut();
}