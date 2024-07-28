import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const editCompaniesSchema = z.object({
  company_picture: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
  company_name: z.string().min(1, { message: "Company name is required" }),
  npwp: z
    .number()
    .min(1, { message: "NPWP is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "NPWP must be a valid number",
    }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0),
  company_address: z
    .string()
    .min(1, { message: "Company address is required" }),
  signature: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type EditCompaniesSchema = z.infer<typeof editCompaniesSchema>;

export interface ICompanies {
  id: number;
  company_picture: string;
  company_name: string;
  npwp: number;
  address: string;
  email: string;
  phone: string;
  company_address: string;
  signature: string;
}
