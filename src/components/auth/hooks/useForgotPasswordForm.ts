import * as Yup from "yup";
import {UseFormConfig, UseFormOptions} from "./types";
import {useFormik} from "formik";

export type ForgotPasswordForm = {
  email: string;
};

export const useForgotPasswordFormConfig: UseFormConfig<ForgotPasswordForm> = (
  options
) => {
  const {onSubmit} = options;

  const initialValues: ForgotPasswordForm = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required."),
  });

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export const useForgotPasswordForm = (
  options: UseFormOptions<ForgotPasswordForm>
) => {
  const formConfig = useForgotPasswordFormConfig(options);
  return useFormik(formConfig);
};
