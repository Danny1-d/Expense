"use client"

import ExpenseChart from "@/features/Dashboard/NewChart"

import { useEffect, useState } from "react";
import Image from "next/image";

import { UseCurrentUser } from "@/hooks/UseCurrentUser";
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { formatInTimeZone } from 'date-fns-tz';

import { BeatLoader} from "react-spinners"

import { Transactions, getLatestBudget, getBudget } from '@/data/GetInfo';
// import Header from "./Header";


interface Expenses {
  name: string;
  price: string;
}[];

interface Transaction {
  amount: number,
  createdAt: Date,
  item: string
};

interface TotalTransaction {
  totalBudget: number;
  latestBudget: number;
  latestCreatedAt: Date;
  entriesCount: number;
  error?: undefined;
}

interface Budget {
  amount: number | null;
  createdAt: Date | null;
  canAddNewBudget: boolean;
}

type TransactionResult = TotalTransaction | { error: string };
type TransactionsResult = Transaction[] | { error: string };
type BudgetResult = Budget | { error: string };

export const Chart = () => {

  const user = UseCurrentUser()

  const [expense, setExpense] = useState<TransactionsResult>();
  const [budget, setBudget] = useState<BudgetResult>();
  const [total, setTotal ] = useState<TransactionResult>();

  useEffect(() => {
    const fetchData = async () => {
      const [transactionsData, budgetData, budget] = await Promise.all([
        Transactions(),
        getLatestBudget(),
        getBudget()
      ]);

      setExpense(transactionsData);
      setBudget(budgetData);
      setTotal(budget);
      // setLoading(false);
    };

    fetchData();
  }, []);

  const expenses: Expenses[] = [
    {
      name: "Services",
      price: "$ 50,000"
    },
    {
      name: "Internet",
      price: "$ 50,000"
    },
    {
      name: "Gadget",
      price: "$ 500,000"
    },
    {
      name: "Car",
      price: "$ 50,000"
    },
    {
      name: "Laundry",
      price: "$ 50,000"
    },
    {
      name: "Internet",
      price: "$ 50,000"
    },
    {
      name: "Internet",
      price: "$ 50,000"
    },
  ]

    const [activeTab, setActiveTab] = useState<string>("dashboard");
   
    const getHeaderTitle = () => {
      switch (activeTab) {
        case "dashboard":
          return "Dashboard";
        case "expenses":
          return "Expenses";
        case "transactions":
          return "Transactions ";
      }
    };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-[#272424] p-2 font-bold text-lg rounded-md">Welcome Onboard, {user?.name}</h2>
        {/* <Header title={getHeaderTitle() || "Header"} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      </div>
      

      <div className="grid md:grid-cols-2 gap-10 px-5">
        <div className="flex flex-col gap-4 m-auto">
          <div className="flex">
            <div className="bg-[#4d1b7a] flex flex-col w-1/2 px-5 py-3 rounded-lg h-45 gap-6">
              <h2 className="text-sm text-[#C2C2C2]">Available Balance</h2>
              <h2 className="text-white text-sm font-semibold">$ 321,500.09</h2>
              <div className='flex justify-between mt-6'>
                <h6 className='text-white text-sm'>****4866</h6>
                <Image
                  src='/mastercard.png'
                  alt="mastercardlogo"
                  width={20}
                  height={20}
                  className='rounded-full'
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 px-5">
              <h4 className="text-sm">Monthly Income</h4>
              {/* <h4 className="text-[#4d1b7a] font-bold">$ 500,000</h4> */}
              <h2 className="text-[#4d1b7a] font-bold">
               $ {budget
                    ? 'error' in budget
                      ? budget.error
                      : (budget as Budget).amount
                    : <BeatLoader size={5}/> 
                  }
              </h2>
          </div>
          </div>
  
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-4 bg-[#e2dfdf] px-10 py-7 rounded-lg">
              <div className="flex gap-5">
                <h4 className="text-sm">Total Income</h4>
                <ArrowDownIcon className="text-[#3aac2e]"/>
              </div>
              {/* <h2 className="text-center text-[#175d27]  font-bold">$ 350,000</h2> */}
              <h2 className="text-center text-[#175d27]  font-bold">
                $ {total
                  ? 'error' in total
                    ? total.error
                    : (total as TotalTransaction).totalBudget
                  : <BeatLoader size={5} />}
              </h2>
            </div>
            <div className="flex flex-col items-center  gap-4 bg-[#e2dfdf] px-10 py-7 rounded-lg">
              <div className="flex gap-5">
                <h4 className="text-sm">Total Expense</h4>
                <ArrowUpIcon className="text-[#8a0b0b]"/>
              </div>
                <h2 className="text-center text-[#8a0b0b] font-bold">$ 170,000</h2>
            </div>
          </div>
        </div>

        <ExpenseChart />


        <div className="px-10">
          <h2 className="text-lg font-semibold text-[#863cc6]">Recent Activities</h2>
          <div className="border"></div>
          {expense && Array.isArray(expense) ? expense.slice(0,4).map((item, idx) => (
            <div className="flex justify-between mt-4" key={idx}>
              <div className="flex justify-center items-center gap-6">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                <div>
                  <h3 className="font-semibold text-sm">{item.item}</h3>
                  <h5 className="text-sm text-start">{formatInTimeZone(new Date(item.createdAt), 'UTC', 'yyyy-MM-dd')}</h5>
                </div>
              </div>
              <h3 className="text-[#863cc6]">{item.amount}</h3>
            </div>
          )): <div className="text-center"><BeatLoader size={5}/></div>}
        </div>

        <div>
          <div className="flex justify-between mb-5 px-5">
            <h2 className="text-[#7a33b9] font-semibold">Monthly Expenses</h2>
            <button className="text-[#7a33b9]">Edit</button>
          </div>
          <div className="grid grid-cols-3 gap-2 px-12">
            {expenses.map((item, idx) => (
              <div className="flex flex-col items-center border py-2 rounded-lg border-gray-400" key={idx}>
                <h4 className="text-sm font-semibold text-gray-700">{item.name}</h4>
                <h3 className="text-sm text-center">{item.price}</h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}