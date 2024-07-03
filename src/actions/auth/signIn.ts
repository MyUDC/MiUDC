'use server';

import { signIn } from "@/auth.config";

export const SignIn = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });
    return {
      ok: true,
      message: 'Signed in successfully'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Failed to sign in'
    }    
  }
}