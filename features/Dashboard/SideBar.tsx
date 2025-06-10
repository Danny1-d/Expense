import { HomeIcon, TextAlignMiddleIcon, TokensIcon, ExitIcon } from '@radix-ui/react-icons';
import { LogOut } from "@/actions/LogOut";
import Image from "next/image"

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideBar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const isActive = (tab: string) => activeTab === tab;

  return (
    <div>

      <nav className="flex-col gap-3 hidden md:block w-[20rem] h-screen p-2 bg-[#340260]">
        <Image 
          src='/danny1.png'
          alt='logo'
          width={1000}
          height={300}
        />

        <div className='mt-10'>
          <div
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 p-6 rounded-md transition-colors cursor-pointer ${
              isActive("dashboard")
                ? "bg-white text-[#340260] font-semibold text-xl"
                : "text-[#C2C2C2] hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <HomeIcon />
            <span className="text-sm">Dashboard</span>
          </div>

          <div
            onClick={() => setActiveTab("expenses")}
            className={`flex items-center gap-3 p-6 rounded-md transition-colors cursor-pointer ${
              isActive("expenses")
                ? "bg-white text-[#340260] font-semibold"
                : "text-[#C2C2C2] hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <TokensIcon />
            <span className="text-sm">Expenses</span>
          </div>

          <div
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center gap-3 p-6 rounded-md transition-colors cursor-pointer ${
              isActive("transactions")
                ? "bg-white text-[#340260] font-semibold"
                : "text-[#C2C2C2] hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <TextAlignMiddleIcon />
            <span className="text-sm">Transactions</span>
          </div>  

          <div
            className='flex items-center gap-3 p-6 mt-20 rounded-md transition-colors cursor-pointer text-[#C2C2C2] hover:bg-white hover:text-gray-900'
            onClick={LogOut}
          >
            <ExitIcon />
            <span className="text-sm">Sign Out</span>
          </div>  

        </div>
      </nav>

    </div>
  );
}

export default SideBar;