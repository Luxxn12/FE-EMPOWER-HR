export interface ISchedule {
  id: number;
  company_id: number;
  name: string;
  schedule_in: string;
  schedule_out: string;
  break_start: string;
  break_end: string;
  repeat_until: string;
  affective_date: string;
  description: string;
}
