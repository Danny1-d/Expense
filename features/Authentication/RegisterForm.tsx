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
import { RegisterSchema } from "@/schemas/Index";
import * as z from "zod"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { Register } from "@/actions/Register";

const RegisterForm = () => {
    const [pending, startTransition] = useTransition();
     const [error, setError] = useState<string | undefined>();
     const [success, setSuccess] = useState<string | undefined>();
   
     const form = useForm<z.infer<typeof RegisterSchema>>({
       resolver: zodResolver(RegisterSchema),
       defaultValues: {
         email: "",
         password: "",
         name: "",
         lastName: ""
       }
     })
   
     const onSubmit =(values: z.infer<typeof RegisterSchema>) => {
       setError("")
       setSuccess("")
       
       startTransition(() => {
         Register(values)
         .then((data) => {
           setError(data.error);
           setSuccess(data.success);
         })
       });
     }
  return (
     <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
        imgSrc="/danny1.png"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">FirstName</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={pending}
                        placeholder="Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300"> LastName</FormLabel>
                    <FormControl>
                      <Input
                        disabled={pending}
                        placeholder="Lastname"
                        type="text" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Email</FormLabel>
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

                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300"> Password</FormLabel>
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
              Create an account
            </Button>
            </div>
  
          </form>
        </Form>

      </CardWrapper>
  )
}

export default RegisterForm