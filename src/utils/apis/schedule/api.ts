import { Response } from "@/utils/types/apis";
import { axiosConfig, setAxiosConfig } from "../axiosWithConfig";
import { ISchedule, ScheduleSchema } from "./type";

const token = localStorage.getItem("token");

export const getSchedule = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.get("/schedule");

    return resp.data as Response<ISchedule[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const getScheduleById = async (
  id: string
): Promise<{ data: ScheduleSchema }> => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.get<{ data: ScheduleSchema }>(
      `/schedule/${id}`
    );
    return resp.data;
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
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.post<Response<any>>("/schedule", body);
    return resp.data;
  } catch (error: any) {
    if (error.resp && error.resp.data) {
      const { message } = error.resp.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const updateSchedule = async (
  id: string,
  body: ScheduleSchema
): Promise<Response<any>> => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.put<Response<any>>(`/schedule/${id}`, body);
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const deleteSchedule = async (id: number): Promise<Response<any>> => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.delete<Response<any>>(`/schedule/${id}`);
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
