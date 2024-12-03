import { FormikProps } from "formik";

import { useTrainingStore } from "../../store/useTrainingStore";
import {
  initialSTraining,
  STraining,
  TrainingSchema,
} from "../../types/trainings";
import CommonForm, { CommonFormConfig } from "../common/CommonForm";
import CommonFormTextField from "../common/CommonFormTextField";
import CommonFormDateField from "../common/CommonFormDateField";

function TrainingCreate({ afterSuccess }: { afterSuccess: () => void }) {
  const { createTraining } = useTrainingStore();
  const config = {
    title: "Add Trainings",
    initialValues: initialSTraining(),
    validationSchema: TrainingSchema,
    onSubmit: async (values: STraining, actions: FormikProps<STraining>) => {
      actions.setSubmitting(false);
      await createTraining(values);
      afterSuccess();
    },
  } as CommonFormConfig<STraining>;

  return (
    <div>
      <CommonForm<STraining> config={config}>
        <CommonFormDateField name="date" label="Date" />
        <CommonFormTextField name="duration" label="Duration" type="number" />
        <CommonFormTextField name="activity" label="Activity" />
      </CommonForm>
    </div>
  );
}

export default TrainingCreate;
