import type { NextAuthConfig } from 'next-auth';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up/register',
  },
  providers: []
};