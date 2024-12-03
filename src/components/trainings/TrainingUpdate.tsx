import { FormikProps } from "formik";

import { useTrainingStore } from "../../store/useTrainingStore";
import { STraining, TrainingSchema } from "../../types/trainings";
import CommonForm, { CommonFormConfig } from "../common/CommonForm";
import CommonFormDateField from "../common/CommonFormDateField";
import CommonFormTextField from "../common/CommonFormTextField";

function TrainingUpdate({
  training,
  afterSuccess,
}: {
  training: STraining;
  afterSuccess: () => void;
}) {
  const { updateTraining } = useTrainingStore();

  const config = {
    title: "Update Training",
    initialValues: training,
    validationSchema: TrainingSchema,
    onSubmit: async (values: STraining, actions: FormikProps<STraining>) => {
      actions.setSubmitting(false);
      await updateTraining(values);
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

export default TrainingUpdate;
