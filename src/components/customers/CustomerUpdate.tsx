import { FormikProps } from "formik";

import { useCustomerStore } from "../../store/useCustomerStore";
import { CustomerSchema, SCustomer } from "../../types/customers";
import CommonForm, { CommonFormConfig } from "../common/CommonForm";
import CommonFormTextField from "../common/CommonFormTextField";

function CustomerUpdate({
  customer,
  afterSuccess,
}: {
  customer: SCustomer;
  afterSuccess: () => void;
}) {
  const { updateCustomer } = useCustomerStore();

  const config = {
    title: "Update Customer",
    initialValues: customer,
    validationSchema: CustomerSchema,
    onSubmit: async (values: SCustomer, actions: FormikProps<SCustomer>) => {
      actions.setSubmitting(false);
      await updateCustomer(values);
      afterSuccess();
    },
  } as CommonFormConfig<SCustomer>;

  return (
    <div>
      <CommonForm<SCustomer> config={config}>
        <CommonFormTextField name="firstname" type="text" label="First Name" />
        <CommonFormTextField name="lastname" type="text" label="Last Name" />
        <CommonFormTextField
          name="streetaddress"
          type="text"
          label="Street Address"
        />
        <CommonFormTextField name="postcode" type="text" label="Postcode" />
        <CommonFormTextField name="city" type="text" label="City" />
        <CommonFormTextField name="phone" type="text" label="Phone" />
        <CommonFormTextField name="email" type="email" label="Email" />
      </CommonForm>
    </div>
  );
}

export default CustomerUpdate;
