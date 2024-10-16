import { PrismaClient } from "@prisma/client";
import { SeedPrisma } from "@snaplet/seed/adapter-prisma";
import { defineConfig } from "@snaplet/seed/config";
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

export default defineConfig({
  adapter: () => {
    const client = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    return new SeedPrisma(client);
  },
  select: ["!*_prisma_migrations"],
});