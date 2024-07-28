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
