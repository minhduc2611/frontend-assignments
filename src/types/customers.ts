import { CommonEntity } from "./common";

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

export interface SCustomer extends CommonEntity {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
};

export const transformICustomerToSCustomer = (customer: ICustomer): SCustomer => {
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
}

// export const transformSCustomerToICustomer = (customer: SCustomer): ICustomer => {
//     return {
//         firstname: customer.firstname,
//         lastname: customer.lastname,
//         streetaddress: customer.streetaddress,
//         postcode: customer.postcode,
//         city: customer.city,
//         email: customer.email,
//         phone: customer.phone,
//         _links: {
//             self: {
//                 href: `/customers/${customer.id}`,
//             },
//             customer: {
//                 href: `/customers/${customer.id}`,
//             },
//             trainings: {
//                 href: `/customers/${customer.id}/trainings`,
//             },
//         },
//     };
// }