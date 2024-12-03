import { FormikProps } from "formik";

import { CustomerSchema, initialSCustomer, SCustomer } from "../../types/customers";
import CommonForm, { CommonFormConfig } from "../common/CommonForm";
import CommonFormTextField from "../common/CommonFormTextField";
import { useCustomerStore } from "../../store/useCustomerStore";

function CustomerCreate({
  afterSuccess,
}: {
  afterSuccess: () => void;
}) {
  const { createCustomer } = useCustomerStore();

  const config = {
    title: "Add Customer",
    initialValues: initialSCustomer(),
    validationSchema: CustomerSchema,
    onSubmit: async (values: SCustomer, actions: FormikProps<SCustomer>) => {
      actions.setSubmitting(false);
      await createCustomer(values);
      afterSuccess();
    },
  } as CommonFormConfig<SCustomer>;

  return (
    <div>
      <CommonForm<SCustomer> config={config}>
        <CommonFormTextField name="firstname" type="text" label="First Name" />
        <CommonFormTextField name="lastname" type="text" label="Last Name" />
        <CommonFormTextField name="streetaddress" type="text" label="Street Address" />
        <CommonFormTextField name="postcode" type="text" label="Postcode" />
        <CommonFormTextField name="city" type="text" label="City" />
        <CommonFormTextField name="phone" type="text" label="Phone" />
        <CommonFormTextField name="email" type="email" label="Email" />
      </CommonForm>
    </div>
  );
}

export default CustomerCreate;
