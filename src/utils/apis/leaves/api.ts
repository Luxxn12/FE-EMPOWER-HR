import { Response } from "@/utils/types/apis";
import { openAPI, setAxiosConfig } from "../axiosWithConfig";
import { ILeaves } from "./type";

const token = localStorage.getItem("token");

export const getLeaves = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);

    const resp = await openAPI.get("/leaves");

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
    const resp = await openAPI.get(`/leaves/${id}`);
    return resp.data as Response<ILeaves>;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
