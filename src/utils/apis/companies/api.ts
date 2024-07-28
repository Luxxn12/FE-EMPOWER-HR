import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { ICompanies } from "./type";

export const getCompanies = async () => {
  try {
    const response = await openAPI.get("/companies");
    return response.data as Response<ICompanies[]>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};

export const getDetailCompenies = async () => {
  try {
    const response = await openAPI.get("/companies");
    return response.data as Response<ICompanies>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
}

export const updateCompanies = async (formData: FormData) => {
  try {
    const response = await openAPI.put(`/companies`, formData, {
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
