import {formX, fieldX} from "type-formik";
import * as Yup from "yup";

@formX()
export class ForgotPasswordForm {
  @fieldX({
    value: "",
    validation: Yup.string().required("Email is required."),
  })
  email: string;
}
