import { useState } from "react";
import Image from "next/image";
import { HomeIcon, TextAlignMiddleIcon, TokensIcon, ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import { LogOut } from "@/actions/LogOut";

interface HeaderProps {
  title?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ title, activeTab, setActiveTab }: HeaderProps) => {
  const isActive = (tab: string) => activeTab === tab;
  const [open, setOpen ] = useState<boolean>(false)


  return (
    // <header className="flex items-center justify-between bg-[#FDFDFD] p-4 w-full shadow-2xs backdrop-blur-3xl">
    <header className="flex justify-end md:hidden">

      <HamburgerMenuIcon className="w-5 h-5 cursor-pointer" onClick={() => setOpen(!open)}/>

      {open && (
        <nav className={`flex flex-col w-[20rem] h-full p-2 bg-[#340260] fixed left-0 top-0 bottom-0 z-50 justify-center${open ? ' animate-slideleft' : 'animate-slideright'}`}>
          <Image 
            src='/danny1.png'
            alt='logo'
            width={1000}
            height={300}
          />
          <div
            onClick={() => {
              setActiveTab("dashboard");
              setOpen(!open);
            }}
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
          onClick={() => {
            setActiveTab("expenses");
            setOpen(!open);
          }} 

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
          onClick={() => {
            setActiveTab("transactions");
            setOpen(!open);
          }}
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
        </nav>
      )}

    {/* <div>
        <h1 className="font-poppins md:font-bold font-semibold  md:text-xl text-sm text-black-500 mx-2">
            {title}
        </h1>
    </div>

    <div className="flex items-center space-x-4 justify-between">
        <div className="relative md:w-[350px]">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 p-1 rounded-3xl border border-gray-300 focus:outline-none text-base"
            />
        </div>
        <Image
            src="/bell-icon.png"
            alt="Bell Icon"
            width={60}
            height={60}
            className="h-15 w-15 rounded-full p-2"
        />

          <Link to='/verifyemail' onClick={sendVerificationOtp} className="border border-gray-300 px-3 py-2 rounded-full text-gray-500 text-sm">
            Verify Email
          </Link>

        <div className="flex items-center space-x-2">
            <Image
                src="/Ellipse 7.png"
                alt="Ellipse Icon"
                width={60}
                height={60}
                className="h-15 w-15 rounded-full p-2"
            />
            <span className="text-gray-700 text-lg font-bold">Danny</span>
        </div>
    </div> */}
</header>
  )
}

export default Header
