import { Response } from "@/utils/types/apis";
import { axiosConfig,  setAxiosConfig } from "../axiosWithConfig";
import { EditPayrollSchemaById, IPayroll } from "./type";

const token = localStorage.getItem("token");

export const getPayrolls = async () => {
    try {
        if (!token) {
            throw new Error("Token not found in localStorage");
          }
          setAxiosConfig(token);
        const resp = await axiosConfig.get("/payroll");
        return resp.data as Response<IPayroll[]>
    } catch (error: any) {
        const { message } = error.respose.data
        throw new Error(message)
    }
}

export const createPayroll = async (body: EditPayrollSchemaById) => {
    try {
        const resp = await axiosConfig.post<Response<any>>("/payroll", body);
        return resp.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            throw new Error(message);
        }
        throw error;
    }
};