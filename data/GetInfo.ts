"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/Auth";
import { getUserByEmail } from "@/data/User";


// This is grouped by month
// export const getTransactions = async () => {
//   const user = await getCurrentUser();
//   const recentUser = user?.email;

//   if (!recentUser) {
//     return { error: "User email not found!" };
//   }

//   const existingUser = await getUserByEmail(recentUser);

//   if (!existingUser) {
//     return { error: "User not found!" };
//   }

//   // Get all transaction to this user
//   const transactions = await db.transaction.findMany({
//     where: {
//       userId: existingUser.id,
//     },
//     // In desc order (newest first)
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   if (!transactions || transactions.length === 0) {
//     return { error: "No transaction entries found!" };
//   }

//   const grouped = transactions.reduce((acc, tx) => {
//     const date = new Date(tx.createdAt);
//     // convert the date to a human readable date
//     const monthKey = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;

//     if (!acc[monthKey]) {
//       acc[monthKey] = [];
//     }

//     acc[monthKey].push(tx);
//     return acc;
//   }, {} as Record<string, typeof transactions>);


//   // convert to an array
//   const result = Object.entries(grouped).map(([month, txs]) => ({
//     month,
//     transactions: txs,
//   }));

//   return result;
// };


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

  // Get all transaction to this user
  const latestBudget = await db.budgetEntry.findFirst({
    where: {
      userId: existingUser.id,
    },
     // In desc order (newest first)
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
        gte: startOfMonth, // greater than or equal to
        lt: endOfMonth, // less than
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
  const totalAmount = budgetEntries.reduce((acc, entry) => acc + entry.amount, 0);

  // Get the most recent one too
  const latestEntry = budgetEntries.reduce((acc, entry) => {
    return new Date(entry.createdAt) > new Date(acc.createdAt) ? entry : acc;
  }, budgetEntries[0]);

  return {
    totalBudget: totalAmount,
    latestBudget: latestEntry.amount,
    latestCreatedAt: latestEntry.createdAt,
    entriesCount: budgetEntries.length,
  };
};

export const getLatestMonthTransactions = async () => {
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

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based
  const currentYear = now.getFullYear();

  let currentMonthTotal = 0;

  const grouped = transactions.reduce((acc, tx) => {
    const date = new Date(tx.createdAt);
    const txMonth = date.getMonth();
    const txYear = date.getFullYear();
    
    // convert the date to a human readable date
    const monthKey = `${date.toLocaleString("default", { month: "long" })} ${txYear}`;

    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }

    acc[monthKey].push(tx);

    if (txMonth === currentMonth && txYear === currentYear) {
      currentMonthTotal += Number(tx.amount); // assumes tx.amount is numeric or stringified number
    }

    return acc;
  }, {} as Record<string, typeof transactions>);

  // convert to an array
  const result = Object.entries(grouped).map(([month, txs]) => ({
    month,
    transactions: txs,
  }));

  return {
    currentMonth: now.toLocaleString("default", { month: "long", year: "numeric" }),
    currentMonthTotal,
    groupedTransactions: result,
  };
};
