import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { FormData, IEmployeeById, IEmployeeGetAll, UpdatePersonalSchema } from "./type";

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
    const response = await openAPI.get(`/employee/${employee_id}`);
    return response.data as Response<IEmployeeById[]>;
  } catch (error: any) {
    const { message } = error.response.data.message;
    throw Error(message);
  }
};

export const createEmployee = async (body: FormData) => {
  try {
    const resp = await openAPI.post<Response<any>>("/employee", body);
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const updatePersonalEmployee = async (
  body: UpdatePersonalSchema,
  employee_id: any
) => {
  try {
    const resp = await openAPI.put<Response<any>>(`/employee/${employee_id}`, body);
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
