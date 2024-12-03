import { useCustomerStore } from "../store/useCustomerStore";

export const useCustomers = () => {
  const {
    customers,
    getAllCustomers,
  } = useCustomerStore();

  return { customers, getAllCustomers };
};
