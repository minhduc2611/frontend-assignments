import { create } from "zustand";
import { getAllTrainings } from "../services/trainings";
import { STraining, transformITrainingToSTraining } from "../types/trainings";

export interface TrainingState {
  trainings: STraining[];
  isLoading: boolean;
  getAllTrainings: () => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  trainings: [],
  isLoading: false,
  getAllTrainings: async () => {
    set(() => ({ isLoading: true }));
    const customers = await getAllTrainings();
    console.log("customers", customers);
    set(() => ({
      trainings: customers._embedded.trainings.map(transformITrainingToSTraining),
      isLoading: false,
    }));
  },
}));
