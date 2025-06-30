"use client";
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { getLatestMonthTransactions, getLatestBudget } from "@/data/GetInfo";
import { BeatLoader } from "react-spinners";

interface Transaction {
  id: string;
  userId: string;
  amount: number;
  createdAt: Date;
  item: string;
}

interface TransactionsByMonth {
  month: string;
  transactions: Transaction[];
}

interface TransactionsResult {
  currentMonth: string;
  currentMonthTotal: number;
  groupedTransactions: TransactionsByMonth[];
}

interface UserBudget {
  amount: number | null;
  createdAt: Date | null;
  canAddNewBudget: boolean;
}

type TransactionsResponse = TransactionsResult | { error: string };
type BudgetResponse = UserBudget | { error: string };

const Transactions = () => {
  const [expense, setExpense] = useState<TransactionsResponse>();
  const [budget, setBudget] = useState<BudgetResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [transactionsData, budgetData] = await Promise.all([
        getLatestMonthTransactions(),
        getLatestBudget(),
      ]);

      setExpense(transactionsData);
      setBudget(budgetData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const isExpenseError = expense && "error" in expense;
  const isBudgetError = budget && "error" in budget;

  return (
    <div>
      <h2 className="bg-[#340260] text-[#C2C2C2] p-2 text-sm md:text-xl rounded-md text-center">
        Expenses Made in the Past Months
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-sm mb-15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm text-gray-800">
              Total Amount Spent This Month
            </h3>
            {!isExpenseError && expense ? (
              <p className="text-xl font-bold text-blue-700">
                ${expense.currentMonthTotal.toFixed(2)}
              </p>
            ) : (
              <p className="text-red-500">Failed to load expense data</p>
            )}
          </div>

          <div>
            {!isExpenseError && expense && (
              <h2 className="text-lg font-semibold">
                Budget for {expense.currentMonth}
              </h2>
            )}

            {/* if is it not isBudgetError and it is budget and they exist a key called amount in budget */}
            {!isBudgetError && budget && "amount" in budget ? (
              <p className="text-xl font-bold text-green-700">
                ${budget.amount?.toFixed(2) ?? "Not set"}
              </p>
            ) : (
              <p className="text-red-500">No budget data found</p>
            )}

            {!isBudgetError &&
              budget &&
              "canAddNewBudget" in budget &&
              !budget.canAddNewBudget && (
                <p className="text-sm text-gray-600 mt-1">
                  A new budget can’t be added this month.
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <table className="w-full">
        <thead className="bg-[#340260] text-[#C2C2C2]">
          <tr>
            <th className="p-4 text-sm">Date</th>
            <th className="p-4 text-sm">Amount</th>
            <th className="p-4 text-sm">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {!expense || isExpenseError ? (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                <BeatLoader size={5} />
              </td>
            </tr>
          ) : expense.groupedTransactions.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                No transactions found.
              </td>
            </tr>
          ) : (
            expense.groupedTransactions.map((monthGroup) => (
              <React.Fragment key={monthGroup.month}>
                <tr>
                  <td colSpan={3} className="p-4 font-bold bg-gray-100">
                    {monthGroup.month}
                  </td>
                </tr>
                {monthGroup.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="p-4 text-sm">
                      {formatInTimeZone(new Date(tx.createdAt), "UTC", "yyyy-MM-dd")}
                    </td>
                    <td className="p-4 text-sm">${tx.amount}</td>
                    <td className="p-4 text-sm">{tx.item}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
