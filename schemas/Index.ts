import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string({
    message: "password is required"
  }),
  code: z.string().optional()
});

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100).nonempty({
    message: "Name is required"
  }),
  lastName: z.string().min(2).max(100).nonempty({
    message: "Last name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6).max(100).nonempty({
    message: "Password is required"
  })
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  })
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6).max(100).nonempty({
    message: "Password is required"
  })
});