import { create } from "zustand";
import { getAllCustomers } from "../services/customers";
import { SCustomer, transformICustomerToSCustomer } from "../types/customers";

export interface CustomerState {
  customers: SCustomer[];
  isLoading: boolean;
  getAllCustomers: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  isLoading: false,
  getAllCustomers: async () => {
    set(() => ({ isLoading: true }));
    const customers = await getAllCustomers();
    console.log("customers", customers);
    set(() => ({
      customers: customers._embedded.customers.map(
        transformICustomerToSCustomer
      ),
      isLoading: false,
    }));
  },
}));
