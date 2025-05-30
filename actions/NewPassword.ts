"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas/Index";
import { getUserByEmail } from "@/data/User";
import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db"

export const NewPassword = async ( 
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid password!" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid or expired token!" };
  }

 
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User not found!" };
  }

   // Here you would typically hash the password and update the user's password in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password in the database (this part is not shown in your code)
  await db.user.update({ where: { id: existingUser.id }, data: { password: hashedPassword } });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });


  return { success: "Password updated successfully!" };
}