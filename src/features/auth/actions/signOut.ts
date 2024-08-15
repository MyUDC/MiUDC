'use server';

import { cookies } from "next/headers";

export const SignOut = () => {
  console.log(process.env.NODE_ENV);
  const cookieStore = cookies();

  if (process.env.NODE_ENV === "production") {
    cookieStore.delete("__Secure-authjs.session-token");
  } else {
    cookieStore.delete("authjs.session-token");
  }
}