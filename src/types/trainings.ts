import { Dayjs } from "dayjs";
import time from "../utils/timeUtils";
import { CommonEntity } from "./common";
import { SCustomer } from "./customers";
import * as Yup from "yup";

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

export type TrainingBody = Pick<ITraining, "date" | "duration" | "activity">;
export interface STraining extends CommonEntity {
  date: Dayjs;
  duration: number;
  activity: string;
  customerId?: number;
  customer?: SCustomer;
}
export const initialSTraining = (): STraining => ({
  id: null,
  date: time.dayjs(),
  duration: 0,
  activity: "",
});

export const transformITrainingToSTraining = (
  training: ITraining
): STraining => {
  return {
    id: Number(training._links.self.href.split("/").pop()),
    date: time.dayjs(training.date),
    duration: training.duration,
    activity: training.activity,
    customerId: Number(training._links.customer.href.split("/").pop()),
  };
};

export const transformSTrainingToTrainingBody = (
  training: STraining
): TrainingBody => {
  return {
    date: training.date.format("YYYY-MM-DDTHH:mm:ssZ"),
    duration: training.duration,
    activity: training.activity,
  };
};

export const transformSTrainingToExcel = (
  training: STraining
) => {
  return {
    id: training.id,
    date: training.date.format("YYYY-MM-DDTHH:mm:ssZ"),
    duration: training.duration,
    activity: training.activity,
  };
};

export const TrainingSchema = Yup.object().shape({
  date: Yup.string().required("Required"),
  duration: Yup.number()
    .min(1, "Duration must be greater than or equal to 0")
    .required("Required"),
  activity: Yup.string().required("Required"),
});
