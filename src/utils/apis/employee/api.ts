import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { IEmployeeGetAll } from "./type";

export const getAllEmployee = async () => {
  try {
    const response = await openAPI.get("/employee");
    return response.data as Response<IEmployeeGetAll[]>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};
