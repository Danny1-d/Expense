"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { 
  Form,
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  // FormDescription, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas/Index";
import * as z from "zod"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { NewPassword } from "@/actions/NewPassword";
import { useSearchParams } from "next/navigation";


export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  const onSubmit =(values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    console.log(values)
    
    startTransition(() => {
      NewPassword(values, token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
    });
  }

  return (
      <CardWrapper
        headerLabel="Enter a new password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        imgSrc="/danny1.png"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={pending}
                        placeholder="password"
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button 
              type="submit" 
              size='icon'
              disabled={pending}
              >
              Reset password
            </Button>
            </div>
  
          </form>
        </Form>

      </CardWrapper>
  )
}