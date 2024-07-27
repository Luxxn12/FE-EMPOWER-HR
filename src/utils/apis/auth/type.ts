import * as z from "zod";

export interface ILogin {
  token: string;
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  work_email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Phone number must be a valid number",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  department: z.string().min(1, { message: "department is required" }),
  job_position: z.string().min(1, { message: "job position is required" }),
  company_name: z.string().min(1, { message: "company_name is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
