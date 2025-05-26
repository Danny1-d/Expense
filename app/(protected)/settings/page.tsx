"use client";

import { LogOut } from "@/actions/LogOut";
import { UseCurrentUser } from "@/hooks/UseCurrentUser";
// import { usePathname } from "next/navigation";

const page =  () => {
  const user = UseCurrentUser()

  const onClick = () => {
    LogOut();
  }

  return (
    <div>
      {JSON.stringify(user)}
        <button type="submit" onClick={onClick} className="bg-red-500 text-white p-2 rounded">
          Sign Out
        </button>
    </div>
  )
}

export default page