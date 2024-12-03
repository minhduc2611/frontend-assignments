import { RestResponse } from "../types/common";
import { ITraining, TrainingBody } from "../types/trainings";
import { axiosInstance } from "./axios";

export const TRAININGS_API_PATH = "trainings";

export const getAllTrainings = async (): Promise<
  RestResponse<typeof TRAININGS_API_PATH, ITraining>
> => {
  const response = await axiosInstance.get<
    RestResponse<typeof TRAININGS_API_PATH, ITraining>
  >(`/${TRAININGS_API_PATH}`);
  return response.data;
};

export const updateOneTraining = async (
  id: number,
  training: TrainingBody
): Promise<RestResponse<typeof TRAININGS_API_PATH, ITraining>> => {
  const response = await axiosInstance.put<
    RestResponse<typeof TRAININGS_API_PATH, ITraining>
  >(`/${TRAININGS_API_PATH}/${id}`, training);
  return response.data;
};

export const createOneTraining = async (
  training: TrainingBody
): Promise<RestResponse<typeof TRAININGS_API_PATH, ITraining>> => {
  const response = await axiosInstance.post<
    RestResponse<typeof TRAININGS_API_PATH, ITraining>
  >(`/${TRAININGS_API_PATH}`, training);
  return response.data;
};

export const deleteOneTraining = async (
  id: number
): Promise<RestResponse<typeof TRAININGS_API_PATH, ITraining>> => {
  const response = await axiosInstance.delete<
    RestResponse<typeof TRAININGS_API_PATH, ITraining>
  >(`/${TRAININGS_API_PATH}/${id}`);
  return response.data;
};
