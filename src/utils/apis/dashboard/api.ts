import { Response } from "@/utils/types/apis"
import { axiosConfig, setAxiosConfig } from "../axiosWithConfig"
import { DashboardAdminType, DashboardEmployeeType } from "./type"

const token = localStorage.getItem("token");

export const getDashboardAdmin = async () => {
    try {
        if (!token) {
            throw new Error("Token not found in localStorage");
          }
      
          setAxiosConfig(token);
        const response = await axiosConfig.get("/dashboard")
        return response.data as Response<DashboardAdminType>
    } catch (error: any) {
        const { message } = error.response.data;
        throw new Error(message);
    }
}
export const getDashboardEmployee = async () => {
    try {
        if (!token) {
            throw new Error("Token not found in localStorage");
          }
      
          setAxiosConfig(token);
        const response = await axiosConfig.get("/dashboard/employee")
        return response.data as Response<DashboardEmployeeType>
    } catch (error: any) {
        const { message } = error.response.data;
        throw new Error(message);
    }
}