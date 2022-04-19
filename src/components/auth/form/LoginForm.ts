import {formX, fieldX} from "type-formik";
import * as Yup from "yup";

@formX()
export class LoginForm {
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
}
