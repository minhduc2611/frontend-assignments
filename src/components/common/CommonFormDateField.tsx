import { ClickAwayListener, FormHelperText, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useField } from "formik";
import { useState } from "react";

/**
 * Value must be a dayjs object
 */
const CommonFormDateField = ({ label, ...props }: { label: string } & any) => {
  const [field, meta] = useField(props);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickAway = () => {
    console.log("click away");
    if (isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Stack direction={"column"}>
          <DateTimePicker
            open={isOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            id="demo-simple-select"
            label={label}
            {...field}
            value={field.value}
            defaultValue={field.value}
            onChange={(date) => {
              console.log("date", date);
              field.onChange({
                target: {
                  name: field.name,
                  value: date,
                },
              });
            }}
            {...props}
          />
          {meta.touched && meta.error ? (
            <FormHelperText style={{ color: "red" }}>
              {meta.error}
            </FormHelperText>
          ) : null}
      </Stack>
    </ClickAwayListener>
  );
};

export default CommonFormDateField;
