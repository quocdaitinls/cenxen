import {formX, fieldX} from "type-formik";
import * as Yup from "yup";

@formX()
export class RegisterForm {
  @fieldX({
    value: "",
    validation: Yup.string().required("Username is required."),
  })
  username: string;

  @fieldX({
    value: "",
    validation: Yup.string().required("Password is required."),
  })
  password: string;

  @fieldX({
    value: "",
    validation: Yup.string().required("Name is required"),
  })
  name: string;

  @fieldX({
    value: "",
    validation: Yup.string().required("Email is required"),
  })
  email: string;

  @fieldX({
    value: "",
    validation: Yup.string(),
  })
  phone: string;
}
