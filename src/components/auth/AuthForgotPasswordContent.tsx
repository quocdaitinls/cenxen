import {useGQLApiMutation} from "@hooks/api";
import {Typography} from "@mui/material";
import {Formik} from "formik";
import React from "react";
import {useFormConfig} from "type-formik";
import {ForgotPasswordForm} from "./form";
import AuthLink from "./shared/AuthLink";
import {AuthSubmitButton} from "./shared/AuthSubmitButton";
import {AuthTextField} from "./shared/AuthTextField";
import {
  StyledAuthForgotPasswordForm,
  StyledAuthForgotPasswordNotification,
} from "./styles/AuthForgotPasswordContent.styles";
import {AuthContentSideFC, createAuthContent} from "./util/createAuthContent";

enum ForgotPasswordSide {
  FORM,
  NOTIFICATION,
}

const AuthForgotPasswordForm: AuthContentSideFC<ForgotPasswordSide> = ({
  changeSide,
}) => {
  const forgotPassword = useGQLApiMutation(
    (apisMap) => apisMap.forgotPassword,
    {
      onSuccess: () => {},
    }
  );

  const formConfig = useFormConfig(ForgotPasswordForm, (value) => {
    forgotPassword.mutate({input: value});
  });

  return (
    <Formik {...formConfig}>
      {(form) => (
        <StyledAuthForgotPasswordForm onSubmit={form.handleSubmit}>
          <AuthTextField
            placeholder='Email'
            type='email'
            required
            name='email'
          />
          <AuthSubmitButton loading={forgotPassword.isLoading} content='Send' />
        </StyledAuthForgotPasswordForm>
      )}
    </Formik>
  );
};

const AuthForgotPasswordNotification: AuthContentSideFC<ForgotPasswordSide> = ({
  changeSide,
}) => {
  return (
    <StyledAuthForgotPasswordNotification>
      <Typography component='p' variant='body1'>
        We have sent an email to your mail. Please check it.
      </Typography>
      <AuthLink
        href='/auth/login'
        className='notifi__link-login'
        content='Go to login page'
      />
    </StyledAuthForgotPasswordNotification>
  );
};

const AuthForgotPasswordContent = createAuthContent(ForgotPasswordSide.FORM, {
  [ForgotPasswordSide.FORM]: AuthForgotPasswordForm,
  [ForgotPasswordSide.NOTIFICATION]: AuthForgotPasswordNotification,
});
export default AuthForgotPasswordContent;
