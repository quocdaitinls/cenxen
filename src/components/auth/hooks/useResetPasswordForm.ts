import {useFormik} from "formik";
import * as Yup from "yup";
import {UseFormConfig, UseFormOptions} from "./types";

export type ResetPasswordForm = {
  newPassword: string;
  confirmNewPassword: string;
};

export const useResetPasswordFormConfig: UseFormConfig<ResetPasswordForm> = (
  options
) => {
  const {onSubmit} = options;

  const initialValues: ResetPasswordForm = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().required("New password is requried."),
    confirmNewPassword: Yup.string()
      .required("Confirm new password is required.")
      .test("password_match", "Passwords must match.", function (value) {
        return this.parent.password === value;
      }),
  });

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export const useResetPasswordForm = (
  options: UseFormOptions<ResetPasswordForm>
) => {
  const formConfig = useResetPasswordFormConfig(options);
  return useFormik(formConfig);
};
