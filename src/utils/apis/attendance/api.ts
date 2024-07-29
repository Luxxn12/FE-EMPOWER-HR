import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { IAttendance } from "./type";

export const getAttendance = async () => {
  try {
    const resp = await openAPI.get("/attendance");

    return resp.data as Response<IAttendance[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const clockIn = async (data: Partial<IAttendance>) => {
  try {
    const resp = await openAPI.post("/attendance", data);
    return resp.data as Response<IAttendance>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const clockOut = async (id: number, data: Partial<IAttendance>) => {
  try {
    const resp = await openAPI.put(`/attendance/${id}`, data);
    return resp.data as Response<IAttendance>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
