import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { EmploymentById, EmploymentIdSchema, FormDataCreate, IEmployeeById, IEmployeeGetAll, UpdatePersonal, UpdatePersonalSchema } from "./type";
import { checkProperty, valueFormatData } from "@/utils/functions";

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

export const getPersonalById = async (employee_id: any) => {
  try {
    const response = await openAPI.get(`/employee/${employee_id}`);
    return response.data as Response<UpdatePersonal>;

  } catch (error: any) {
    const { message } = error.response.data.message;
    throw Error(message);
  }
};
export const getEmploymentById = async (employee_id: any) => {
  try {
    const response = await openAPI.get(`/employment/${employee_id}`);
    return response.data as Response<EmploymentById>;

  } catch (error: any) {
    const { message } = error.response.data.message;
    throw Error(message);
  }
};

export const createEmployee = async (body: FormDataCreate) => {
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

export const updatePersonalEmployee = async ( body: UpdatePersonalSchema, employee_id: any) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const resp = await openAPI.put<UpdatePersonal>(`/employee/${employee_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};
export const updateEmploymenId = async ( body: EmploymentIdSchema, employee_id: any) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const resp = await openAPI.put<EmploymentById>(`/employment/${employee_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

