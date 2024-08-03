import { Response } from "@/utils/types/apis";
import { axiosConfig, openAPI, setAxiosConfig } from "../axiosWithConfig";
import { EmploymentIdSchema, IEmployeeById, IEmployeeGetAll, RootDataEmployee, UpdatePersonal, UpdatePersonalSchema } from "./type";
import { checkProperty, valueFormatData } from "@/utils/functions";

const token = localStorage.getItem("token");

export const getAllEmployee = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/employee");
    return response.data as Response<IEmployeeGetAll[]>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};
export const getAllEmployment = async () => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/employee");
    return response.data as Response<IEmployeeById>;
  } catch (error: any) {
    const message = error.response?.data?.message || "An error occurrend";
    throw new Error(message);
  }
};

export const getEmployeeById = async (employee_id: number) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get(`/employee/${employee_id}`);
    return response.data as Response<IEmployeeById>;
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

export const getEmploymentById = async (employee_id: number): Promise<Response<IEmployeeById>> => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get(`/employee/${employee_id}`);
    return response.data as Response<IEmployeeById>;

  } catch (error: any) {
    const { message } = error.response.data.message;
    throw Error(message);
  }
};

export const createEmployee = async (body: RootDataEmployee) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const resp = await axiosConfig.post<Response<any>>("/employee", body);
    return resp.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const updatePersonalEmployee = async (body: UpdatePersonalSchema, employee_id: any) => {
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


export const updateEmploymenId = async (employee_id: number, body: EmploymentIdSchema): Promise<IEmployeeById> => {
  try {
    const resp = await axiosConfig.put<IEmployeeById>(`/employment/${employee_id}`, body);
    return resp.data
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const deleteEmployee = async (employee_id: number) => {
  try {
    const resp = await axiosConfig.delete(`/employee/${employee_id}`);
    return resp.data as Response<IEmployeeGetAll>
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
}

