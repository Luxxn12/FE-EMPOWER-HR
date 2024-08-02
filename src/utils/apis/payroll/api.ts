import { Response } from "@/utils/types/apis";
import { openAPI } from "../axiosWithConfig";
import { EditPayrollSchemaById, IPayroll } from "./type";

export const getPayrolls = async () => {
    try {
        const resp = await openAPI.get("/payroll");
        return resp.data as Response<IPayroll[]>
    } catch (error: any) {
        const { message } = error.respose.data
        throw new Error(message)
    }
}

export const createPayroll = async (body: EditPayrollSchemaById) => {
    try {
        const resp = await openAPI.post<Response<any>>("/payroll", body);
        return resp.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            throw new Error(message);
        }
        throw error;
    }
};

// export const updatePayroll = async (body: EditPayrollSchemaById) => {
//     try {
//         const formData = new FormData();
//         let key: keyof typeof body;

//         for (key in body) {
//             if (checkProperty(body[key])) {
//                 formData.append(key, valueFormatData(body[key]));
//             }
//         }
//         const response = await openAPI.post(`/payroll`, formData);
//         return response.data as Response<EditPayroll>;
//     } catch (error: any) {
//         const { message } = error.response.data;
//         throw Error(message);
//     }
// };