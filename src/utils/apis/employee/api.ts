import { Response } from "@/utils/types/apis";
import { axiosConfig, openAPI, setAxiosConfig } from "../axiosWithConfig";
import { EmploymentIdSchema, IEmployeeById, IEmployeeGetAll, RootDataEmployee, UpdatePersonal } from "./type";

const token = localStorage.getItem("token");

export const getAllEmployee = async (page: number) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    const response = await axiosConfig.get("/employee?page=" + page);
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

export const updatePersonalEmployee = async ( employee_id: number, formData: FormData) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    setAxiosConfig(token);
    console.log('Sending request to:', `/employee/${employee_id}`);
    console.log('With data:', formData);
    const resp = await axiosConfig.put<IEmployeeById>(`/employee/${employee_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log('Response:', resp);
    return resp.data;
  } catch (error: any) {
    console.error('Error:', error);
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

