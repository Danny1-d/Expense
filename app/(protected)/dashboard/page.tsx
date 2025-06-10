"use client";
import { useState } from "react";
import { Chart } from "@/features/Dashboard/Chart";
import SideBar from "@/features/Dashboard/SideBar";
import Header from "@/features/Dashboard/Header";
import Expense from "@/features/Dashboard/Expense";
import Transactions from "@/features/Dashboard/Transactions";
// import { useAuthStore } from '../stores/authStore';

const DashBoard = () => {
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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Chart />;
      case "expenses":
        return <Expense />;
      case "transactions":
        return <Transactions />
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Content for this tab is coming soon!
            </p>
          </div>
        );
    }
  };
  return (
    <div className="flex">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-gray-100 w-full">
        <main className="flex-1 p-3 h-screen">
          <Header title={getHeaderTitle() || "Header"} activeTab={activeTab} setActiveTab={setActiveTab} />
          {renderContent()}
        </main>
      </div>
      </div>
  )
}

export default DashBoard;