import { useTrainingStore } from "../../store/useTrainingStore";
import { STraining, transformSTrainingToExcel } from "../../types/trainings";
import time from "../../utils/timeUtils";
import EnhancedSortableTable, { HeadCell } from "../common/SortableTable";
import TrainingCreate from "./TrainingCreate";
import TrainingUpdate from "./TrainingUpdate";

const headCells: readonly HeadCell<STraining>[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
    render: (cell) => time.formatTimeDayjs(cell.date),
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
  const { trainings, deleteTraining } = useTrainingStore();
  return (
    <div>
      <EnhancedSortableTable<STraining>
        title="Trainings"
        rows={trainings}
        headCells={headCells}
        renderUpdateComponent={(row, callback) => (
          <TrainingUpdate training={row} afterSuccess={callback} />
        )}
        renderCreateComponent={(callback) => (
          <TrainingCreate afterSuccess={callback} />
        )}
        deleteAction={(row, callback) => {
          if (!row.id) {
            throw new Error("Training id is missing");
          }
          deleteTraining(row.id);
          callback();
        }}
        stateToExcel={transformSTrainingToExcel}
      />
    </div>
  );
};

export default TrainingTable;
