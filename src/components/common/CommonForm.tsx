import { Button, Stack, Typography } from "@mui/material";
import { Form, Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import React, { useEffect } from "react";

export type CommonFormConfig<T> = {
  title: string;
} & FormikConfig<T>;

function CommonForm<T extends FormikValues>({
  config,
  children,
}: {
  config: CommonFormConfig<T>;
  children: React.ReactNode;
}) {
  const ref = React.useRef<FormikProps<T>>(null);

  // clear form on unmount
  useEffect(() => {
    return () => {
      if (ref.current && ref.current?.handleReset) {
        ref.current?.handleReset();
      }
    };
  }, []);

  return (
    <Stack direction={"column"} justifyItems={"center"} alignItems={"center"}>
      <Typography color="primary">
        <h3>{config.title}</h3>
      </Typography>
      <Formik
        innerRef={ref}
        validateOnBlur
        validateOnChange
        initialValues={config.initialValues}
        onSubmit={config.onSubmit}
        validationSchema={config.validationSchema}
      >
        {(props: FormikProps<T>) => {
          const { errors, initialValues, values, resetForm } = props;
          const isDifferent =
            JSON.stringify(initialValues) !== JSON.stringify(values);
          return (
            <Form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 15,
              }}
            >
              {children}
              {/* {JSON.stringify(values)} <br />
              {JSON.stringify(errors)} <br />
              {JSON.stringify(touched)} */}
              <br />
              <Button
                disabled={!isDifferent}
                variant="outlined"
                type="button"
                onClick={() => resetForm()}
              >
                Reset
              </Button>
              {/* Object.keys(errors).length > 0 ||
                  Object.keys(touched).length === 0 || */}
              <Button
                disabled={!isDifferent || Object.keys(errors).length > 0}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
}

export default CommonForm;
