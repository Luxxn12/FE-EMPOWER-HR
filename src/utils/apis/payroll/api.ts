import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { IPayroll } from "./type";

export const getPayrolls = async () => {
    try {
        const resp = await openAPI.get("/payroll");
        return resp.data as Response<IPayroll[]>
    } catch (error: any) {
        const { message } = error.respose.data
        throw new Error(message)
    }
}