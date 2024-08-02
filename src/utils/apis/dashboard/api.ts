import { Response } from "@/utils/types/apis"
import { openAPI } from "../axiosWithConfig"
import { DashboardAdminType, DashboardEmployeeType } from "./type"

export const getDashboardAdmin = async () => {
    try {
        const response = await openAPI.get("/dashboard")
        return response.data as Response<DashboardAdminType>
    } catch (error: any) {
        const { message } = error.response.data;
        throw new Error(message);
    }
}
export const getDashboardEmployee = async () => {
    try {
        const response = await openAPI.get("/dashboard/employee")
        return response.data as Response<DashboardEmployeeType>
    } catch (error: any) {
        const { message } = error.response.data;
        throw new Error(message);
    }
}