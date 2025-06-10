"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/Auth";
import { getUserByEmail } from "@/data/User";


// This is grouped by month
export const getTransactions = async () => {
  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: existingUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!transactions || transactions.length === 0) {
    return { error: "No transaction entries found!" };
  }

  const grouped = transactions.reduce((acc, tx) => {
    const date = new Date(tx.createdAt);
    const monthKey = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }

    acc[monthKey].push(tx);
    return acc;
  }, {} as Record<string, typeof transactions>);


  const result = Object.entries(grouped).map(([month, txs]) => ({
    month,
    transactions: txs,
  }));

  return result;
};


// This is grouped by month
export const getLatestBudget = async () => {
  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const latestBudget = await db.budgetEntry.findFirst({
    where: {
      userId: existingUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

   if (!latestBudget) {
    return { error: "No budget entries found!" };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  // Check if a budget entry exists for this month
  const thisMonthBudget = await db.budgetEntry.findFirst({
    where: {
      userId: existingUser.id,
      createdAt: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  return {
    amount: latestBudget?.amount ?? null,
    createdAt: latestBudget?.createdAt ?? null,
    canAddNewBudget: !thisMonthBudget, // true if user hasn't added one this month
  };
};


// This is not grouped by month
export const Transactions = async () => {
  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: existingUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

    if (!transactions) {
    return { error: "No transaction entries found!" };
  }

  return transactions;
};

// This is not grouped by month
export const getBudget = async () => {
  const user = await getCurrentUser();
  const recentUser = user?.email;

  if (!recentUser) {
    return { error: "User email not found!" };
  }

  const existingUser = await getUserByEmail(recentUser);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  // Get all budget entries for the user
  const budgetEntries = await db.budgetEntry.findMany({
    where: {
      userId: existingUser.id,
    },
  });

  if (!budgetEntries || budgetEntries.length === 0) {
    return { error: "No budget entries found!" };
  }

  // Calculate total amount
  const totalAmount = budgetEntries.reduce((sum, entry) => sum + entry.amount, 0);

  // Get the most recent one too
  const latestEntry = budgetEntries.reduce((latest, entry) => {
    return new Date(entry.createdAt) > new Date(latest.createdAt) ? entry : latest;
  }, budgetEntries[0]);

  return {
    totalBudget: totalAmount,
    latestBudget: latestEntry.amount,
    latestCreatedAt: latestEntry.createdAt,
    entriesCount: budgetEntries.length,
  };
};