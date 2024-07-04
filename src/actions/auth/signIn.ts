'use server';

import { signIn } from "@/auth.config";
import { sleep } from "@/utils/sleep";

export const SignIn = async (email: string, password: string) => {
  console.log({ form: { email, password } });
  
  try {
    // await sleep(2);
    await signIn('credentials', { email, password, redirect: false });
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