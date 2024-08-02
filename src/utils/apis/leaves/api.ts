import { Response } from "@/utils/types/apis";
import { axiosConfig, openAPI, setAxiosConfig } from "../axiosWithConfig";
import { ILeaves } from "./type";

const token = localStorage.getItem("token");

export const getLeaves = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const resp = await axiosConfig.get("/leaves");

    return resp.data as Response<ILeaves[]>;
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

    const resp = await axiosConfig.get("/leaves/employee");

    return resp.data as Response<ILeaves[]>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
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
    const resp = await axiosConfig.get(`/leaves/${id}`);
    return resp.data as Response<ILeaves>;
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
    const response = await openAPI.put(`/leaves/${id}`, {
      status,
      reason,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
