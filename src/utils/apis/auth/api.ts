import { Response } from "@/utils/types/apis";
import { axiosConfig } from "../axiosWithConfig";
import { ILogin, LoginSchema, RegisterSchema } from "./type";

export const userLogin = async (body: LoginSchema): Promise<Response<any>> => {
  try {
    const resp = await axiosConfig.post("/login", body);
    return resp.data as Response<ILogin>;
  } catch (error: any) {
    if (error.resp && error.resp.data) {
      const { message } = error.resp.data;
      throw new Error(message);
    }
    throw error;
  }
};

export const userRegister = async (
  body: RegisterSchema
): Promise<Response<any>> => {
  try {
    const resp = await axiosConfig.post<Response<any>>("/admin", body);
    return resp.data;
  } catch (error: any) {
    if (error.resp && error.resp.data) {
      const { message } = error.resp.data;
      throw new Error(message);
    }
    throw error;
  }
};
