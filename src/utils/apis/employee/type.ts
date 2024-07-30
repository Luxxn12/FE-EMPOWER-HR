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
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Not a valid phone number" }),
  place_birth: z.string().min(1, { message: "Place of birth is required" }),
  birth_date: z
    .string()
    .min(1, { message: "Birth date is required" })
    .regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Not a valid birth date" }),
  status: z.string().min(1, { message: "Status is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  nik: z
    .string()
    .min(1, { message: "NIK is required" })
    .regex(/^\d{16}$/, { message: "Not a valid NIK" }),
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
  salary: string;
  bank_name: string;
  account_number: string;
}

export interface FormData {
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
  phone: z.string().min(1, { message: "phone is required" }),
  place_birth: z.string().min(1, { message: "place_birth is required" }),
  birth_date: z.string().min(1, { message: "birth_date is required" }),
  status: z.string().min(1, { message: "status is required" }),
  gender: z.string().min(1, { message: "gender is required" }),
  religion: z.string().min(1, { message: "religion is required" }),
  nik: z.string().min(1, { message: "nik is required" }),
  address: z.string().min(1, { message: "address is required" }),
});

export const employmentSchema = z.object({
  employment_status: z
    .string()
    .min(1, { message: "employment_status is required" }),
  schedule: z.string().min(1, { message: "schedule is required" }),
  join_date: z.string().min(1, { message: "join_date is required" }),
  job_level: z.string().min(1, { message: "job_level is required" }),
  department: z.string().min(1, { message: "department is required" }),
  approval_line: z.string().min(1, { message: "approval_line is required" }),
  job_position: z.string().min(1, { message: "job_position is required" }),
});

export const payrollSchema = z.object({
  salary: z.string().min(1, { message: "salary is required" }),
  bank_name: z.string().min(1, { message: "bank_name is required" }),
  account_number: z.string().min(1, { message: "account_number is required" }),
});

export type PersonalSchema = z.infer<typeof personalSchema>;
export type EmploymentSchema = z.infer<typeof employmentSchema>;
export type PayrollSchema = z.infer<typeof payrollSchema>;