import { RestResponse } from "../types/common";
import { ITraining } from "../types/trainings";
import { axiosInstance } from "./axios";

export const TRAININGS_API_PATH = "trainings";

export const getAllTrainings = async (): Promise<RestResponse<typeof TRAININGS_API_PATH, ITraining>> => {
  const response = await axiosInstance.get<RestResponse<typeof TRAININGS_API_PATH, ITraining>>(`/${TRAININGS_API_PATH}`);
  return response.data;
};
