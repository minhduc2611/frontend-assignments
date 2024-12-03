import { create } from "zustand";
import {
  createOneCustomer,
  deleteOneCustomer,
  getAllCustomers,
  updateOneCustomer,
} from "../services/customers";
import {
  SCustomer,
  transformICustomerToSCustomer,
  transformSCustomerToCustomerBody,
} from "../types/customers";
import { toast } from "react-toastify";

export interface CustomerState {
  customers: SCustomer[];
  isLoading: boolean;
  getAllCustomers: () => void;
  updateCustomer: (customer: SCustomer) => void;
  createCustomer: (customer: SCustomer) => void;
  deleteCustomer: (id: number | null) => void;
}

export const useCustomerStore = create<CustomerState>((set) => {
  const getCustomers = async () => {
    set(() => ({ isLoading: true }));
    const customers = await getAllCustomers();
    set(() => ({
      customers: customers._embedded.customers.map(
        transformICustomerToSCustomer
      ),
      isLoading: false,
    }));
  };
  const updateCustomer = async (customer: SCustomer) => {
    if (!customer.id) {
      throw new Error("Customer id is missing");
    }
    set(() => ({ isLoading: true }));
    const body = transformSCustomerToCustomerBody(customer);
    await updateOneCustomer(customer.id, body);
    await getCustomers();
    toast.success("Customer updated");
    set(() => ({ isLoading: false }));
  };
  const createCustomer = async (customer: SCustomer) => {
    set(() => ({ isLoading: true }));
    const body = transformSCustomerToCustomerBody(customer);
    await createOneCustomer(body);
    await getCustomers();
    toast.success("Customer Created");
    set(() => ({ isLoading: false }));
  };

  const deleteCustomer = async (id: number | null) => {
    if (!id) {
      throw new Error("Customer id is missing");
    }
    set(() => ({ isLoading: true }));
    await deleteOneCustomer(id);
    await getCustomers();
    toast.success("Customer deleted");
    set(() => ({ isLoading: false }));
  };

  return {
    customers: [],
    isLoading: false,
    getAllCustomers: getCustomers,
    updateCustomer: updateCustomer,
    createCustomer: createCustomer,
    deleteCustomer: deleteCustomer,
  };
});
