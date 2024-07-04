import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma';


export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      return true;
    },
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    }
  },
  debug: true,
  providers: [

    Credentials({
      async authorize(credentials) {

        // Validate the credentials
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // If the credentials are invalid, return null
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Find the user by their email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // Check if the password is correct
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // user without password
        const { password: _, ...userWithoutPassword } = user;

        console.log({ userWithoutPassword });

        return userWithoutPassword;
      }
    }),
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);