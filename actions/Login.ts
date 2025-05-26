"use server";
import * as z  from "zod";
import { LoginSchema } from "@/schemas/Index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerficiationToken, generateTwoFactorToken} from "@/lib/Token";
import { getUserByEmail } from "@/data/User";
import { sendVerificiationEmail, sendTwoFactorEmail } from "@/lib/Mail";

import { getTwoFactorTokenByEmail } from "@/data/TwoFactorToken";

import { db } from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from "@/data/TwoFactorConfirmation";


export const Login = async (
  value: z.infer<typeof LoginSchema>,
  callbackUrl?: string
) => {
  const validatedFields = LoginSchema.safeParse(value);

  if(!validatedFields.success) {
    return { error: "Invalid fields!"};
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error : "Email does not exist!"}
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerficiationToken(existingUser.email)

     await sendVerificiationEmail(
        verificationToken.email,
        verificationToken.token
      )

    return { success: "Confirmation email sent!"}
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid two-factor code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid two-factor code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "code expired" }
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        });
      };

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });

    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );
    }


    return { twoFactor: true, success: "Two-factor authentication email sent!"}
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "An unexpected error occurred!" };
      }
    }

    throw error;
  }


}