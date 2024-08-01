import * as z from "zod";

export interface ISchedule {
  id: number;
  name: string;
  schedule_in: string;
  schedule_out: string;
  break_start: string;
  break_end: string;
  repeat_until: string;
  effective_date: string;
  affective_date: string;
  description: string;
}

export const scheduleSchema = z.object({
  company_id: z.number().min(1, { message: "company_id is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  schedule_in: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Schedule in must be in HH:MM format" }),
  schedule_out: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Schedule out must be in HH:MM format",
  }),
  break_start: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Break start must be in HH:MM format" }),
  break_end: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Break end must be in HH:MM format" }),
  repeat_until: z.string().regex(/^\d+\s(?:day|days)$/, {
    message: "Repeat until must be in 'X day(s)' format",
  }),
  affective_date: z.string({message: "Affective date must be in DD-MM-YYYY format"}),
  description: z.string().optional(),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;
