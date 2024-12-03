import { useTrainingStore } from "../../store/useTrainingStore";
import { STraining } from "../../types/trainings";
import time from "../../utils/time";
import EnhancedSortableTable, { HeadCell } from "../common/SortableTable";

const headCells: readonly HeadCell<STraining>[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
    render: (cell) => time.formatTime(cell.date),
  },
  {
    id: "duration",
    numeric: false,
    disablePadding: false,
    label: "Duration",
  },
  {
    id: "activity",
    numeric: false,
    disablePadding: false,
    label: "Activity",
  },
];

const TrainingTable = () => {
  const { trainings } = useTrainingStore();
  return (
    <div>
      <EnhancedSortableTable<STraining>
        title="Trainings"
        rows={trainings}
        headCells={headCells}
      />
    </div>
  );
};

export default TrainingTable;
