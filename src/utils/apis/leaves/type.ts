import * as z from "zod";

export interface ILeaves {
  leave_id: number;
  personal_id: number;
  name: string;
  job_position: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
}

export const leavesSchema = z.object({
  start_date: z
    .string()
    .min(1, { message: "Start date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
  end_date: z
    .string()
    .min(1, { message: "End date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format"),
  reason: z.string().min(1, { message: "Reason is required" }),
});

export type LeavesSchema = z.infer<typeof leavesSchema>;
