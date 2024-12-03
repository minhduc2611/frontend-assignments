import { create } from "zustand";
import {
  createOneTraining,
  deleteOneTraining,
  getAllTrainings,
  updateOneTraining,
} from "../services/trainings";
import {
  STraining,
  transformITrainingToSTraining,
  transformSTrainingToTrainingBody,
} from "../types/trainings";
import { toast } from "react-toastify";
import { SEvent } from "../types/events";

export interface TrainingState {
  trainings: STraining[];
  statisticData: { labels: string[]; data: number[] };
  events: SEvent[];
  isLoading: boolean;
  getAllTrainings: () => void;
  updateTraining: (training: STraining) => void;
  createTraining: (training: STraining) => void;
  deleteTraining: (id: number | null) => void;
}

export const useTrainingStore = create<TrainingState>((set, get) => {
  const getTrainings = async () => {
    set(() => ({ isLoading: true }));
    const customers = await getAllTrainings();
    set(() => ({
      trainings: customers._embedded.trainings.map(
        transformITrainingToSTraining
      ),
      isLoading: false,
    }));
    updateStatisticalData();
    getEvents();
  };

  const updateStatisticalData = async () => {
    const { trainings } = get();
    if (trainings && trainings.length === 0) {
      await getTrainings();
    }
    const dataMap = trainings.reduce((acc, training) => {
      acc[training.activity] =
        (acc[training.activity] || 0) + training.duration;
      return acc;
    }, {} as { [key: string]: number });
    // console.log(dataMap);
    set(() => ({
      statisticData: {
        labels: Object.keys(dataMap),
        data: Object.values(dataMap),
      },
    }));
  };

  const getEvents = async () => {
    const { trainings } = get();
    if (trainings && trainings.length === 0) {
      await getTrainings();
    }
    const events: SEvent[] = trainings.map((training) => {
      return {
        event_id: training.id || 0,
        title: training.activity,
        start: training.date.toDate(),
        end: training.date.add(training.duration, "minutes").toDate(),
        disabled: false,
        customer: "",
      };
    });
    set((state) => ({ ...state, events: events }));
  };

  const updateTraining = async (training: STraining) => {
    if (!training.id) {
      throw new Error("Training id is missing");
    }
    set(() => ({ isLoading: true }));
    const body = transformSTrainingToTrainingBody(training);
    await updateOneTraining(training.id, body);
    await getTrainings();
    toast.success("Training updated");
    set(() => ({ isLoading: false }));
  };

  const createTraining = async (training: STraining) => {
    set(() => ({ isLoading: true }));
    const body = transformSTrainingToTrainingBody(training);
    await createOneTraining(body);
    await getTrainings();
    toast.success("Training Created");
    set(() => ({ isLoading: false }));
  };

  const deleteTraining = async (id: number | null) => {
    if (!id) {
      throw new Error("Training id is missing");
    }
    set(() => ({ isLoading: true }));
    await deleteOneTraining(id);
    await getTrainings();
    toast.success("Training Deleted");
    set(() => ({ isLoading: false }));
  };

  return {
    trainings: [],
    isLoading: false,
    events: [],
    statisticData: { labels: [], data: [] },
    getAllTrainings: getTrainings,
    updateTraining: updateTraining,
    createTraining: createTraining,
    deleteTraining: deleteTraining,
    updateStatisticalData: updateStatisticalData,
  };
});
