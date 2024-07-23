'use server';

import { signIn } from "@/auth.config";

export const SignIn = async (email: string, password: string) => {
  
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    return {
      ok: true,
      message: 'Signed in successfully'
    }
  } catch (error) {

    console.log("Error type:" + (error as any).type);
    
    if ((error as any).type === 'CredentialsSignin') {
      return {
        ok: false,
        message: 'Credentials sign in error'
      }
    }

    return {
      ok: false,
      message: 'Unknown error'
    }    
  }
}