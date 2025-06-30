// import { Poppins } from "next/font/google";
// import { cn } from "@/lib/utils";

import Image from "next/image";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"]
// })

interface HeaderProps {
  label:string;
}

export const Header = ({
  label
}: HeaderProps) => {
  return(
    <div className="flex flex-col items-center justify-center">
         <Image
            src="/danny1.png"
            alt="danny"
            width={300}
            height={10}
            className="mx-auto"
          />
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}