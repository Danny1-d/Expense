"use server";
import * as z  from "zod";
import { RegisterSchema } from "@/schemas/Index";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { getUserByEmail } from "@/data/User";

import { generateVerficiationToken } from "@/lib/Token";
import { sendVerificiationEmail } from "@/lib/Mail";

export const Register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(value);

  if(!validatedFields.success) {
    return { error: "Invalid fields!"};
  }

  const { name, lastName, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  // Here you would typically save the user to your database
   await db.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const verficationToken = await generateVerficiationToken(email)

  await sendVerificiationEmail(
    verficationToken.email,
    verficationToken.token
  )

  return { success: "Confirmation email sent!"};
}