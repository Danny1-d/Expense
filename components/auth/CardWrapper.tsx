"use client"

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
// import Image from "next/image";
import { BackButton } from "@/components/auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  // imgSrc?: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  // imgSrc
}:CardWrapperProps) => {
  return (
    <Card className="w-[350px] md:w-[600px] shadow-md px-2 md:px-20 m-auto">
      <CardHeader>
        <Header label={headerLabel ?? ""}/>
        {/* {imgSrc && (
          <Image 
            src={imgSrc}
            alt="danny"
            width={300}
            height={10}
            className="mx-auto"
          />
        )} */}
  
      </CardHeader>

      <CardContent>
        {children}  
      </CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton
          label={backButtonLabel ?? ""}
          href={backButtonHref ?? ""}
        />
      </CardFooter>
    </Card>
  )
}