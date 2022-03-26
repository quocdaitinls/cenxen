import {useFormik} from "formik";
import * as Yup from "yup";
import {UseFormConfig, UseFormOptions} from "./types";

export type LoginForm = {
  username: string;
  password: string;
};

export const useLoginFormConfig: UseFormConfig<LoginForm> = (options) => {
  const {onSubmit} = options;

  const initialValues: LoginForm = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
  });

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export const useLoginForm = (options: UseFormOptions<LoginForm>) => {
  const formConfig = useLoginFormConfig(options);
  return useFormik(formConfig);
};
