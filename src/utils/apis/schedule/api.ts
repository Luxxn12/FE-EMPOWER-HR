import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { ISchedule, ScheduleSchema } from "./type";

export const getSchedule = async () => {
  try {
    const resp = await openAPI.get("/schedule");

    return resp.data as Response<ISchedule[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const addSchedule = async (
  body: ScheduleSchema
): Promise<Response<any>> => {
  try {
    const resp = await openAPI.post<Response<any>>("/schedule", body);
    return resp.data;
  } catch (error: any) {
    if (error.resp && error.resp.data) {
      const { message } = error.resp.data;
      throw new Error(message);
    }
    throw error;
  }
};
