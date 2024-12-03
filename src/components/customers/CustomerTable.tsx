import { useCustomerStore } from "../../store/useCustomerStore";
import { SCustomer } from "../../types/customers";
import EnhancedSortableTable, { HeadCell } from "../common/SortableTable";
import CustomerCreate from "./CustomerCreate";
import CustomerUpdate from "./CustomerUpdate";

const headCells: readonly HeadCell<SCustomer>[] = [
  {
    id: "firstname",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "streetaddress",
    numeric: false,
    disablePadding: false,
    label: "Street Address",
  },
  {
    id: "postcode",
    numeric: true,
    disablePadding: false,
    label: "Postcode",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
];
const CustomerTable = () => {
  const { customers, deleteCustomer } = useCustomerStore();
  return (
    <div>
      <EnhancedSortableTable<SCustomer>
        title="Customers"
        rows={customers}
        headCells={headCells}
        renderUpdateComponent={(row, callback) => (
          <CustomerUpdate customer={row} afterSuccess={callback} />
        )}
        renderCreateComponent={(callback) => <CustomerCreate afterSuccess={callback}  />}
        deleteAction={(row, callback) => {
          deleteCustomer(row.id);
          callback();
        }}
      />
    </div>
  );
};

export default CustomerTable;
