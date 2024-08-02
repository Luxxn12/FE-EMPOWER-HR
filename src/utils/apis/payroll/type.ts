import { z } from "zod";

export interface IPayroll {
    id: number
    employee_name: string
    date: string
    position: string
    payslip: string
  }
  
  export interface EditPayroll {
    employee_id: number
    salary: number
    bank_name: string
    acoount_num: number
  }

export const editPayrollSchema = z.object({
  salary: z
    .string()
    .min(1, { message: "Please enter salary" }),
  bank_name: z
    .string()
    .min(1, { message: "Please enter bank name" }),
  acoount_num: z
    .string()
    .min(1, { message: "Please enter account number" }),
})
  
export type EditPayrollSchemaById = z.infer<typeof editPayrollSchema>