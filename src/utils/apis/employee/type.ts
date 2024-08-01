import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface IEmployeeGetAll {
  id: number;
  name: string;
  job_position: string;
  employment_status: string;
  job_level: string;
  join_date: string;
}

export interface IEmployeeById {
  id: number;
  profile_picture: string;
  name: string;
  email: string;
  phone_number: string;
  place_birth: string;
  birth_date: string;
  gender: string;
  religion: string;
  nik: number;
  address: string;
  EmploymentData: EmploymentById[];
}

export interface EmploymentById {
  join_date: string;
  department: string;
  job_position: string;
  job_level: string;
  schedule: string;
  approval_line: string;
  manager: string;
}

export const updatePersonalSchema = z.object({
  profile_picture: z
    .instanceof(File)
    .refine((file) => file.name !== "", "Cover image is required")
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^\d{10,12}$/, "Invalid phone number"),
  place_birth: z.string().min(1, { message: "Place of birth is required" }),
  birth_date: z.string().min(1, { message: "birth_date is required" }),
  status: z.string().min(1, { message: "status is required" }),
  gender: z.string().min(1, { message: "gender is required" }),
  religion: z.string().min(1, { message: "religion is required" }),
  nik: z
    .string()
    .min(1, { message: "NIK is required" })
    .regex(/^\d{16}$/, "Invalid NIK"),
  address: z.string().min(1, { message: "Address is required" }),
});

export type UpdatePersonalSchema = z.infer<typeof updatePersonalSchema>;

export interface UpdatePersonal {
  profile_picture: string;
  name: string;
  email: string;
  phone: string;
  place_birth: string;
  birth_date: string;
  status: string;
  gender: string;
  religion: string;
  nik: string;
  address: string;
}

export interface RootDataEmployee {
  personal: Personal;
  employment: Employment;
  payroll: Payroll;
}

export interface Personal {
  name: string;
  email: string;
  phone: string;
  place_birth: string;
  birth_date: string;
  status: string;
  gender: string;
  religion: string;
  nik: string;
  address: string;
}

export interface Employment {
  employment_status: string;
  schedule: string;
  join_date: string;
  job_level: string;
  department: string;
  approval_line: string;
  job_position: string;
}

export interface Payroll {
  salary: number;
  bank_name: string;
  account_number: string;
}

export interface FormDataCreate {
  name: string;
  email: string;
  phone: string;
  place_birth: string;
  birth_date: string;
  status: string;
  gender: string;
  religion: string;
  nik: string;
  address: string;
  employment_status: string;
  schedule: string;
  join_date: string;
  job_level: string;
  department: string;
  approval_line: string;
  job_position: string;
  salary: string;
  bank_name: string;
  account_number: string;
}

export const personalSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^\d{10,12}$/, "Invalid phone number"),
  place_birth: z.string().min(1, { message: "Place of birth is required" }),
  birth_date: z.string().min(1, { message: "birth_date is required" }),
  status: z.string().min(1, { message: "status is required" }),
  gender: z.string().min(1, { message: "gender is required" }),
  religion: z.string().min(1, { message: "religion is required" }),
  nik: z
    .string()
    .min(1, { message: "NIK is required" })
    .regex(/^\d{16}$/, "Invalid NIK"),
  address: z.string().min(1, { message: "Address is required" }),
});

export const employmentSchema = z.object({
  employment_status: z
    .string()
    .min(1, { message: "Please select your employment status" }),
  schedule: z.string().min(1, { message: "Please select your work schedule" }),
  join_date: z.string().min(1, { message: "Please enter your join date" }),
  job_level: z.string().min(1, { message: "Please select your job level" }),
  department: z.string().min(1, { message: "Please select your department" }),
  approval_line: z
    .string()
    .min(1, { message: "Please select your approval line" }),
  job_position: z
    .string()
    .min(1, { message: "Please enter your job position" }),
});

export const payrollSchema = z.object({
  salary: z.string().min(1, { message: "Please enter your salary" }),
  bank_name: z.string().min(1, { message: "Please select your bank name" }),
  account_number: z
    .string()
    .min(1, { message: " Please enter your account number " }),
});

export const employmentIdSchema = z.object({
  manager: z
    .string()
    .min(1, { message: "Please select your employment status" }),
  schedule: z.string().min(1, { message: "Please select your work schedule" }),
  join_date: z.string().min(1, { message: "Please enter your join date" }),
  job_level: z.string().min(1, { message: "Please select your job level" }),
  department: z.string().min(1, { message: "Please select your department" }),
  approval_line: z
    .string()
    .min(1, { message: "Please select your approval line" }),
  job_position: z
    .string()
    .min(1, { message: "Please enter your job position" }),
});

export type PersonalSchema = z.infer<typeof personalSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;
export type EmploymentIdSchema = z.infer<typeof employmentIdSchema>;
export type PayrollSchema = z.infer<typeof payrollSchema>;
