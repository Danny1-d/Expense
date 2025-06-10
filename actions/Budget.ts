"use server";

import * as z from "zod";
import { db } from "@/lib/db";

import { BudgetSchema } from "@/schemas/Index";
import { getCurrentUser } from "@/lib/Auth";

import { getUserByEmail } from "@/data/User";


export const Budget = async (values: z.infer<typeof BudgetSchema>) => {
  const validatedFields = BudgetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid budget value!" };
  }

  const { budget } = validatedFields.data;

  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const existingBudget = await db.budgetEntry.findFirst({
    where: {
      userId: existingUser.id,
    },
  });

  if (existingBudget) {
    await db.budgetEntry.create({
      data: {
        amount: Number(budget),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

  } else {
    await db.budgetEntry.create({
      data: {
        amount: Number(budget),
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
