import { Response } from "@/utils/types/apis";
import { axiosConfig, setAxiosConfig } from "../axiosWithConfig";
import { ILeaves, LeavesSchema } from "./type";

const token = localStorage.getItem("token");

export const getLeaves = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/leaves");

    return response.data as Response<ILeaves[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const getUserLeaves = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/leaves/employee");

    return response.data as Response<ILeaves[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const requestLeaves = async (
  body: LeavesSchema
): Promise<Response<any>> => {
  try {
    const resp = await axiosConfig.post<Response<any>>("/leaves", body);
    return resp.data;
  } catch (error: any) {
    if (error.resp && error.resp.data) {
      const { message } = error.resp.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const getLeavesById = async (id: number) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get(`/leaves/${id}`);
    return response.data as Response<ILeaves>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const updateLeaveStatus = async (
  id: number,
  status: string,
  reason: string
): Promise<Response<any>> => {
  try {
    const response = await axiosConfig.put(`/leaves/${id}`, {
      status,
      reason,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
