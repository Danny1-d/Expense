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
import { LoginSchema } from "@/schemas/Index";
import * as z from "zod"
import { CardWrapper } from "@/components/auth/CardWrapper";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { Login } from "@/actions/Login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? 
  "Email already in use with different provider" : "";

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: ""
    }
  })

  const onSubmit =(values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      Login(values, callbackUrl)
      .then((data) => {
        if(data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      })
        .catch (() => setError("Something went wrong!"));
    });
  }

  return (
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        // imgSrc="/danny1.png"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              {showTwoFactor && (
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className={`flex flex-col ${!showTwoFactor ? 'hidden' : ''}`}>
                    <FormLabel className="text-gray-300">Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field} 
                        disabled={pending}
                        placeholder="code"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              )}

              {!showTwoFactor && (
                <>
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
                    <Button 
                      size='sm'
                      variant='link'
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/auth/reset">
                        Forgot Password?
                      </Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </>
              )}
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button 
              type="submit" 
              size='icon'
              disabled={pending}
              >
              {showTwoFactor ? "Submit Code" : "Login"}
            </Button>
            </div>
  
          </form>
        </Form>

      </CardWrapper>
  )
}

export default LoginForm;