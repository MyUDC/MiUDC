'use server';

import { cookies } from "next/headers";

export const SignOut = () => {
  console.log(process.env.NODE_ENV);
  const cookieStore = cookies();

  if (process.env.NODE_ENV === "production") {
    cookieStore.set({
      name: '__Secure-authjs.session-token',
      value: '',
      expires: new Date(0),
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'strict'
    })
  } else {
    cookieStore.delete("authjs.session-token");
  }
}