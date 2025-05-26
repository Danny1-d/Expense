"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/Index";
import { getUserByEmail } from "@/data/User";

import { sendPasswordResetEmail } from "@/lib/Mail";
import { generatePasswordResetToken } from "@/lib/Token";

export const Reset = async (values: z.infer<typeof ResetSchema>) => {

  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {error : "Invalid email!"}
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {error: "Email not found!"};
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "Reset email sent!"}

}