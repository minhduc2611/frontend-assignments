import { FormHelperText, Stack, TextField } from "@mui/material";
import {
  useField
} from "formik";

const CommonFormTextField = ({ label, ...props }: { label: string } & any) => {
  const [field, meta] = useField(props);
  return (
    <Stack direction={'column'}>
      <TextField label={label} {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormHelperText style={{ color: "red" }}>{meta.error}</FormHelperText>
      ) : null}
    </Stack>
  );
};

export default CommonFormTextField;