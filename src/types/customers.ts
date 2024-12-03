import { CommonEntity } from "./common";
import * as Yup from "yup";

export type ICustomer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
    trainings: {
      href: string;
    };
  };
};

export type CustomerBody = Pick<
  ICustomer,
  | "firstname"
  | "lastname"
  | "streetaddress"
  | "postcode"
  | "city"
  | "email"
  | "phone"
>;

export interface SCustomer extends CommonEntity {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
}
export const initialSCustomer = (): SCustomer => ({
  id: null,
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
});

export const CustomerSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  streetaddress: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  postcode: Yup.string()
    .min(2, "Too Short!")
    .max(6, "Too Long!")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

export const transformICustomerToSCustomer = (
  customer: ICustomer
): SCustomer => {
  return {
    id: Number(customer._links.self.href.split("/").pop()),
    firstname: customer.firstname,
    lastname: customer.lastname,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
    email: customer.email,
    phone: customer.phone,
  };
};

export const transformSCustomerToCustomerBody = (
  customer: SCustomer
): CustomerBody => {
  const result: CustomerBody = {
    firstname: customer.firstname,
    lastname: customer.lastname,
    streetaddress: customer.streetaddress,
    postcode: customer.postcode,
    city: customer.city,
    email: customer.email,
    phone: customer.phone,
  };
  for (const key in result) {
    const value = result[key as keyof CustomerBody];
    if (value === undefined || value === null) {
      delete result[key as keyof CustomerBody];
    }
  }
  return result;
};
