import { RestResponse } from "../types/common";
import { ICustomer } from "../types/customers";
import { axiosInstance } from "./axios";

export const CUSTOMER_API_PATH = "customers";

export const getAllCustomers = async (): Promise<RestResponse<typeof CUSTOMER_API_PATH, ICustomer>> => {
  const response = await axiosInstance.get<RestResponse<typeof CUSTOMER_API_PATH, ICustomer>>(`/${CUSTOMER_API_PATH}`);
  return response.data;
};
