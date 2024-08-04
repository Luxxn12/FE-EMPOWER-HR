import { Response } from "@/utils/types/apis";
import { axiosConfig,  setAxiosConfig } from "../axiosWithConfig";
import { ICompanies, ICompaniesIndex } from "./type";

const token = localStorage.getItem("token");

export const getCompanies = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/companies");
    return response.data as Response<ICompaniesIndex>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};

export const getDetailCompenies = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/companies");
    return response.data as Response<ICompaniesIndex>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
}

export const updateCompanies = async (formData: FormData) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.put(`/companies`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as Response<ICompanies>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};