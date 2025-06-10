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
import { ResetSchema } from "@/schemas/Index";
import * as z from "zod"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { Reset } from "@/actions/Reset";


export const ResetForm = () => {

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit =(values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")

    console.log(values)
    
    startTransition(() => {
      Reset(values)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
    });
  }

  return (
      <CardWrapper
        headerLabel="Forgot your password"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        // imgSrc="/danny1.png"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={pending}
                        placeholder="email"
                        type="email" 
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
              Reset email
            </Button>
            </div>
  
          </form>
        </Form>

      </CardWrapper>
  )
}