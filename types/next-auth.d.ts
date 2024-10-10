import { $Enums } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Career } from "@prisma/client";

interface IUser extends User {
  id: string;
  role: $Enums["Role"];
  username: string;
  career?: Career;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
