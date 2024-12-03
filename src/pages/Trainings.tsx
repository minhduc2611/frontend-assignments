import { useEffect } from "react";
import { useTrainingStore } from "../store/useTrainingStore";
import TrainingTable from "../components/trainings/TrainingTable";

function Trainings() {
  const { getAllTrainings } = useTrainingStore();
  useEffect(() => {
    getAllTrainings();
  }, []);
  return <TrainingTable></TrainingTable>;
}

export default Trainings;
