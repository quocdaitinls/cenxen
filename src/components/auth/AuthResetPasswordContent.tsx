import {useGQLApiMutation} from "@hooks/api";
import {Typography} from "@mui/material";
import {Formik} from "formik";
import {useRouter} from "next/router";
import {useResetPasswordFormConfig} from "./hooks/useResetPasswordForm";
import AuthLink from "./shared/AuthLink";
import {AuthSubmitButton} from "./shared/AuthSubmitButton";
import {AuthTextField} from "./shared/AuthTextField";
import {
  StyledAuthResetPasswordForm,
  StyledAuthResetPasswordNotification,
} from "./styles/AuthResetPasswordForm.styles";
import {AuthContentSideFC, createAuthContent} from "./util/createAuthContent";

enum ResetPasswordSide {
  FORM,
  NOTIFICATION,
}

const AuthResetPasswordForm: AuthContentSideFC<ResetPasswordSide> = (props) => {
  const {token} = useRouter().query;
  const resetPassword = useGQLApiMutation((apisMap) => apisMap.resetPassword, {
    onSuccess: () => {},
  });

  const formConfig = useResetPasswordFormConfig({
    onSubmit: (value) => {
      resetPassword.mutate({
        input: {
          token: token as string,
          new_password: value.newPassword,
        },
      });
    },
  });

  return (
    <Formik {...formConfig}>
      {(form) => (
        <StyledAuthResetPasswordForm onSubmit={form.handleSubmit}>
          <AuthTextField
            placeholder='New password'
            type='password'
            required
            name='newPassword'
          />
          <AuthTextField
            placeholder='Confirm new password'
            type='password'
            required
            name='confirmNewPassword'
          />

          <AuthSubmitButton loading={resetPassword.isLoading} content='Reset' />
        </StyledAuthResetPasswordForm>
      )}
    </Formik>
  );
};

const AuthResetPasswordNotification: AuthContentSideFC<
  ResetPasswordSide
> = () => {
  return (
    <StyledAuthResetPasswordNotification>
      <Typography component='p' variant='body1'>
        We have sent an email to your mail. Please check it.
      </Typography>
      <AuthLink
        href='/auth/login'
        className='notifi__link-login'
        content='Go to login page'
      />
    </StyledAuthResetPasswordNotification>
  );
};

const AuthResetPasswordContent = createAuthContent(ResetPasswordSide.FORM, {
  [ResetPasswordSide.FORM]: AuthResetPasswordForm,
  [ResetPasswordSide.NOTIFICATION]: AuthResetPasswordNotification,
});

export default AuthResetPasswordContent;
