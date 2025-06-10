"use server";

import * as z from "zod";
import { db } from "@/lib/db";

import { TransactionSchema } from "@/schemas/Index";
import { getCurrentUser } from "@/lib/Auth";

import { getUserByEmail } from "@/data/User";


export const Transaction = async (values: z.infer<typeof TransactionSchema>) => {
  const validatedFields = TransactionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid budget value!" };
  }

   const { item, amount } = validatedFields.data;

  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const existingBudget = await db.transaction.findFirst({
    where: {
      userId: existingUser.id,
    },
  });

  if (existingBudget) {
    await db.transaction.create({
      data: {
        item: item,
        amount: Number(amount),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

  } else {
    
    await db.transaction.create({
      data: {
        item: item,
        amount: Number(amount),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });
  }

  return { success: true };
};
