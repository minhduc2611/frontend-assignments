import { useEffect } from "react";
import CustomerTable from "../components/customers/CustomerTable";
import { useCustomerStore } from "../store/useCustomerStore";

function Customer() {
  const { getAllCustomers } = useCustomerStore();
  useEffect(() => {getAllCustomers()}, []);
  return <CustomerTable />;
}

export default Customer;
