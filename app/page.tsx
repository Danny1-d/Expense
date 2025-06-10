"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const font = Poppins({
  weight: ["700"],
  subsets: ["latin"]
})

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="bg-wheat-800 h-screen w-screen flex flex-col justify-between">
      <div className='flex justify-between'>
            <Image 
              src='/danny1.png'
              alt="Danny"
              width={250} 
              height={0}
            />
          <div className="md:p-6 p-3">
            <Button onClick={() => router.push('/auth/login')} size='sm' variant='outline'>Login</Button>
          </div>
      </div>

      <div className='items-center justify-center md:px-30 md:py-20 p-10 m-auto'>
        <h2 className={cn(' md:text-3xl text-lg text-center',font.className)}>Welcome to Our App</h2>
        <h4 className='md:text-lg text-sm text-[#7E7E7E] mx-auto text-center'>Your personal finance assistant</h4>
        <h4 className='md:text-lg text-sm text-[#7E7E7E] max-w-[270px] mx-auto text-center'>Get started by creating an account</h4>
        <div className='flex justify-center mt-10'>
          <Button onClick={() => router.push('/auth/register')} size='icon'>Get Started</Button>
      </div>
    </div>
    </div>
  )
}

export default HomePage;