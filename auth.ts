import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/User"

import { getTwoFactorConfirmationByUserId } from "@/data/TwoFactorConfirmation"


export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  events: {
    async linkAccount ({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(), // Set emailVerified to the current date
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log({
        user,
        account
      })
      // Allow OAuth without email verficiation
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      //Prevent signIn without email verficiation
      if (!existingUser?.emailVerified) return false;

      if( existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        console.log({twoFactorConfirmation});

        if (!twoFactorConfirmation) return false;

        //Delete the two-factor confirmation for next sign-in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        });
      }

      return true; // Allow sign-in
    },

    async session({ session, token }) {
      // console.log("Session Callback:", token);
      
      if (token.sub && session.user) {
        // Attach the user ID to the session object
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        // Attach the user's role to the session object
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role; // Attach the user's role to the token

      return token 
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})