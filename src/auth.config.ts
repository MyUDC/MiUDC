import NextAuth, { User, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type User as DbUser } from '@prisma/client';

import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma';


export default {
  trustHost: true,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up/register'
  },
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

        return userWithoutPassword;
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true },
        });
    
        if (existingUser) {
          if (existingUser.accounts?.some((acc) => acc.provider === account.provider)) {
            const updatedUser = await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                image: profile?.picture!,
              },
            });
            return true;
          }

          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string | null | undefined,
            },
          });

          const updatedUser = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              image: profile?.picture!,
            },
          });
    
          // Actualizar los datos del usuario en el token y la sesión
          const { password, ...userWithoutPassword } = existingUser;
          Object.assign(updatedUser, userWithoutPassword);
          console.log(userWithoutPassword);
          
          return true;
        } else {
          // Crear una nueva cuenta
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              role: "ASPIRANT",
              emailVerified: null,
              image: profile?.picture!,
              username: user.email!,
              password: null,
            },
          });
    
          // Vincular la cuenta de proveedor de OAuth a la nueva cuenta
          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string | null | undefined,
            },
          });
    
          Object.assign(user, newUser);
          return true;
        }
      }
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.  id!;
        token.picture = user.image;
      }
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