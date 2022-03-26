import {useFormik} from "formik";
import * as Yup from "yup";
import {UseFormConfig, UseFormOptions} from "./types";

export type RegisterForm = {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
};

export const useRegisterFormConfig: UseFormConfig<RegisterForm> = (options) => {
  const {onSubmit} = options;

  const initialValues: RegisterForm = {
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
    name: Yup.string().required("Name is requried."),
    email: Yup.string().required("Email is required."),
    phone: Yup.string(),
  });

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};

export const useRegisterForm = (options: UseFormOptions<RegisterForm>) => {
  const formConfig = useRegisterFormConfig(options);
  return useFormik(formConfig);
};
