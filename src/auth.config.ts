import NextAuth, { User, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter';

import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma';


export default {
  trustHost: true,
  providers: [
    Google,
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
        if (!bcryptjs.compareSync(password, user.password!)) return null;

        // user without password
        const { password: _, ...userWithoutPassword } = user;

        console.log({ userWithoutPassword });

        return userWithoutPassword;
      }
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up/register'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (!dbUser) return null;

        console.log("from ", dbUser.image);
        token.role = dbUser.role;
        token.id = dbUser.id;
        token.picture = dbUser.image;
      };
      return token;
    },
    session({ session, token, user }) {
      
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.image = token.picture;
      }

      return session;
    }
  }
} satisfies NextAuthConfig;