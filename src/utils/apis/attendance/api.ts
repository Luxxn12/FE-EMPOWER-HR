import { Response } from "@/utils/types/apis";
import { axiosConfig, setAxiosConfig } from "../axiosWithConfig";
import { IAttendance } from "./type";

const token = localStorage.getItem("token");

export const getAttendance = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const resp = await axiosConfig.get("/attendance");

    return resp.data as Response<IAttendance[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const getUserAttendance = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.get("/attendance/user");

    return resp.data as Response<IAttendance[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const getAttendanceById = async (id: number) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.get(`/attendance/${id}`);
    return resp.data as Response<IAttendance>;
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
    const resp = await axiosConfig.post("/attendance", data);
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
    const resp = await axiosConfig.put(`/attendance/${id}`, data);
    return resp.data as Response<IAttendance>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
