"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
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
import { BudgetSchema, TransactionSchema } from "@/schemas/Index";
import * as z from "zod"
import { Transaction } from "@/actions/Transaction";
import { Budget } from "@/actions/Budget";
import { useSearchParams } from "next/navigation";

const Expense = () => {
  // const [budget, setBudget] = useState<number>();
  // const [expenses, setExpenses] = useState<{ name: string; amount: number }>({
  //   name: "",
  //   amount: 0,
  // });

  const searchParams = useSearchParams();
    const token = searchParams.get("token");
  
    const [pending, startTransition] = useTransition();
    const [suspended, Transition] = useTransition();
  
    const form1 = useForm<z.infer<typeof BudgetSchema>>({
      resolver: zodResolver(BudgetSchema),
      defaultValues: {
        budget: "",
      }
    })

    const form2 = useForm<z.infer<typeof TransactionSchema>>({
      resolver: zodResolver(TransactionSchema),
      defaultValues: {
        item: "",
        amount: ""
      }
    })
  
    const onSubmit =(values: z.infer<typeof BudgetSchema>) => {
  
      // console.log("Budget:", values)
      
      startTransition(() => {
        Budget(values)
        // .then((data) => {
        //   setError(data?.error);
        //   setSuccess(data?.success);
        // })
      });
    }

     const handleSubmit =(values: z.infer<typeof TransactionSchema>) => {
      
      Transition(() => {
        Transaction(values)
        // .then((data) => {
        //   setError(data?.error);
        //   setSuccess(data?.success);
        // })
      });
    }

  return (
    <div className="flex flex-col m-auto gap-20 w-1/2">
      <Form {...form1}>
        <form onSubmit={form1.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form1.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={pending}
                      placeholder="Budget for the month"
                      type="number" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <Button 
            type="submit" 
            size='sm'
            disabled={pending}
            >
            Budget
          </Button>
          </div>
        </form>
      </Form>

      <div>
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <FormField
                control={form2.control}
                name="item"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input
                        disabled={suspended}
                        placeholder="Item"
                        type="text" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form2.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={suspended}
                        placeholder="Amount"
                        type="number" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button 
              type="submit" 
              size='icon'
              disabled={suspended}
              >
              Transactions
            </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Expense;