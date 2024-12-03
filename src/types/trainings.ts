import { CommonEntity } from "./common";
import { SCustomer } from "./customers";

export type ITraining = {
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: {
      href: string;
    };
    training: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
};

export interface STraining extends CommonEntity {
    date: string;
    duration: number;
    activity: string;
    customerId?: number;
    customer?: SCustomer;
}

export const transformITrainingToSTraining = (training: ITraining): STraining => {
    return {
        id: Number(training._links.self.href.split("/").pop()),
        date: training.date,
        duration: training.duration,
        activity: training.activity,
        customerId: Number(training._links.customer.href.split("/").pop()),
    };
}
