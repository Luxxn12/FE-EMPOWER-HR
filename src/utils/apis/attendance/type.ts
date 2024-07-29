interface IEmploymentData {
  id_personal: number;
  name: string;
}

export interface IAttendance {
  id: number;
  name: string;
  clock_in: string;
  clock_out: string;
  status: string;
  date: string;
  long: string;
  lat: string;
  notes: string;
  employementData: IEmploymentData[]
}
