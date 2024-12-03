import { RestResponse } from "../types/common";
import { CustomerBody, ICustomer } from "../types/customers";
import { axiosInstance } from "./axios";

export const CUSTOMER_API_PATH = "customers";

export const getAllCustomers = async (): Promise<
  RestResponse<typeof CUSTOMER_API_PATH, ICustomer>
> => {
  const response = await axiosInstance.get<
    RestResponse<typeof CUSTOMER_API_PATH, ICustomer>
  >(`/${CUSTOMER_API_PATH}`);
  return response.data;
};

export const updateOneCustomer = async (
  id: number,
  customer: CustomerBody
): Promise<RestResponse<typeof CUSTOMER_API_PATH, ICustomer>> => {
  const response = await axiosInstance.put<
    RestResponse<typeof CUSTOMER_API_PATH, ICustomer>
  >(`/${CUSTOMER_API_PATH}/${id}`, customer);
  return response.data;
};

export const createOneCustomer = async (
  customer: CustomerBody
): Promise<RestResponse<typeof CUSTOMER_API_PATH, ICustomer>> => {
  const response = await axiosInstance.post<
    RestResponse<typeof CUSTOMER_API_PATH, ICustomer>
  >(`/${CUSTOMER_API_PATH}`, customer);
  return response.data;
};

export const deleteOneCustomer = async (
  id: number
): Promise<RestResponse<typeof CUSTOMER_API_PATH, ICustomer>> => {
  const response = await axiosInstance.delete<
    RestResponse<typeof CUSTOMER_API_PATH, ICustomer>
  >(`/${CUSTOMER_API_PATH}/${id}`);
  return response.data;
}
