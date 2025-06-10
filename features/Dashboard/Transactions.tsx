"use client";
import React from "react";
import { formatInTimeZone } from 'date-fns-tz';
import { useState, useEffect } from "react";

import { getTransactions, getLatestBudget } from '@/data/GetInfo';

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

interface Budget {
  amount: number | null;
  createdAt: Date | null;
  canAddNewBudget: boolean;
}

type TransactionsResult = TransactionsByMonth[] | { error: string };
type BudgetResult = Budget | { error: string };

const Transactions = () => {

  const [expense, setExpense] = useState<TransactionsResult>();
  const [budget, setBudget] = useState<BudgetResult>()

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setExpense(data);
    };
    
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await getLatestBudget();
      setBudget(data);
    };

    fetchBudget();
  }, []);  

  return (
    <div className="">
      <h2 className="bg-[#340260] text-[#C2C2C2] p-2 text-sm md:text-xl rounded-md text-center">Expenses Made in the Past Months</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm mb-15">
          <div className="flex items-center justify-between">
            <h3 className="md:text-lg text-sm text-gray-800">Total Amount spent this Month</h3>
            {/* <h2>
              {budget
                ? 'error' in budget
                  ? budget.error
                  : (budget as Budget).amount
                : 'Loading...'}
            </h2> */}

              {budget && 'amount' in budget && budget.amount ? (
                <div>
                  <p className="text-lg">${budget.amount}</p>
                  <p className="text-sm text-gray-500">
                     {budget.createdAt ? new Date(budget.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                ) : (
                  <p>No budget set yet.</p>
              )}

            {budget && 'canAddNewBudget' in budget && budget.canAddNewBudget ? (
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Add Budget for This Month
              </button>
            ) : (
              <p className="mt-4 text-green-600">You’ve already set a budget this month ✅</p>
            )}
          </div>
        </div>



      <table className="w-full">

        <thead className="bg-[#340260] text-[#C2C2C2]">
          <tr>
            <th className="p-4 text-sm">Date</th>
            <th className="p-4 text-sm">Amount</th>
            <th className="p-4 text-sm">Description</th>
          </tr>
        </thead>
        
        <tbody className="bg-white">
          {Array.isArray(expense) ? (
            expense.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center">No transactions found.</td>
              </tr>
            ) : (
              expense.map((monthGroup, idx) => (
                <React.Fragment key={monthGroup.month}>
                  <tr>
                    <td colSpan={3} className="p-4 font-bold bg-gray-100">{monthGroup.month}</td>
                  </tr>
                  {monthGroup.transactions.map((list) => (
                    <tr key={list.id}>
                      <td className="p-4 text-sm">{formatInTimeZone(new Date(list.createdAt), 'UTC', 'yyyy-MM-dd')}</td>
                      <td className="p-4 text-sm">{list.amount}</td>
                      <td className="p-4 text-sm">{list.item}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )
          )
           : (
            <tr>
              <td colSpan={3} className="p-4 text-center">Loading ...</td>
            </tr>
          )
          }
        </tbody>
      </table>

    </div>
  )
}

export default Transactions;