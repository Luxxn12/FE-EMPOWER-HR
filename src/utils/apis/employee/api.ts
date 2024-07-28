import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { IEmployeeById, IEmployeeGetAll } from "./type";

export const getAllEmployee = async () => {
  try {
    const response = await openAPI.get("/employee");
    return response.data as Response<IEmployeeGetAll[]>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};


export const getEmployeeById = async (employee_id: any) => {
    try {
        const response = await openAPI.get(`/employee/${employee_id}`)
        return response.data as Response<IEmployeeById[]>;
    } catch (error: any) {
        const { message } = error.response.data.message;
        throw Error(message);
    }
}