import { Box } from "@mui/material";
import { useEffect } from "react";
import Scheduler from "../components/schedule/Scheduler";
import { useTrainingStore } from "../store/useTrainingStore";
function Schedule() {
  const { events, getAllTrainings } = useTrainingStore();
  useEffect(() => {
    getAllTrainings();
  }, []);

  return (
    <Box height={500}>{events.length > 0 && <Scheduler events={events} />}</Box>
  );
}

export default Schedule;
