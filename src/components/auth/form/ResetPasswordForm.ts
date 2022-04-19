import {formX, fieldX} from "type-formik";
import * as Yup from "yup";

@formX()
export class ResetPasswordForm {
  @fieldX({
    value: "",
    validation: Yup.string().required("New password is requried."),
  })
  newPassword: string;

  @fieldX({
    value: "",
    validation: Yup.string()
      .required("Confirm new password is required.")
      .test("password_match", "Passwords must match.", function (value) {
        return this.parent.password === value;
      }),
  })
  confirmNewPassword: string;
}
