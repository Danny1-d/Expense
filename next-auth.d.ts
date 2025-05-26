import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER"; // Define the roles you want to support
}

declare module "next-auth" {
  interface Session {
      user: ExtendedUser;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER"; // Define the roles you want to support
  }
}