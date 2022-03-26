import {useGQLApiMutation} from "@hooks/api";
import {Typography} from "@mui/material";
import {Formik} from "formik";
import React from "react";
import {useRegisterFormConfig} from "./hooks/useRegisterForm";
import AuthLink from "./shared/AuthLink";
import {AuthSubmitButton} from "./shared/AuthSubmitButton";
import {AuthTextField} from "./shared/AuthTextField";
import {
  StyledAuthRegisterForm,
  StyledAuthRegisterNotification,
} from "./styles/AuthRegisterContent.styles";
import {AuthContentSideFC, createAuthContent} from "./util/createAuthContent";

enum RegisterSide {
  FORM,
  NOTIFICATION,
}

type RegisterContentProps = {
  registerSuccess: boolean;
};

const AuthRegisterForm: AuthContentSideFC<
  RegisterSide,
  RegisterContentProps
> = ({changeSide}) => {
  const register = useGQLApiMutation((apisMap) => apisMap.register, {
    onSuccess: () => {
      changeSide(RegisterSide.NOTIFICATION, {registerSuccess: true});
    },
  });

  const formConfig = useRegisterFormConfig({
    onSubmit: async (value) => {
      register.mutateAsync({input: value});
    },
  });

  return (
    <Formik {...formConfig}>
      {(form) => (
        <StyledAuthRegisterForm onSubmit={form.handleSubmit}>
          <AuthTextField placeholder='Username' required name='username' />
          <AuthTextField
            placeholder='Password'
            type='password'
            required
            name='password'
          />
          <AuthTextField placeholder='Name' required name='name' />
          <AuthTextField
            placeholder='Email'
            type='email'
            required
            name='email'
          />
          <AuthTextField placeholder='Phone' name='phone' />

          <Typography
            className='form__text-confirm'
            component='p'
            variant='body1'
          >
            {
              "By signing up, you confirm that you've read and accepted our User Notice and Privacy Policy."
            }
          </Typography>

          <AuthSubmitButton loading={register.isLoading} content='Register' />

          <AuthLink
            href='/auth/login'
            className='form__link-login'
            content='Already have an account? Login now'
          />
        </StyledAuthRegisterForm>
      )}
    </Formik>
  );
};

const AuthRegisterNotification: AuthContentSideFC<
  RegisterSide,
  RegisterContentProps
> = ({registerSuccess}) => {
  return (
    <StyledAuthRegisterNotification>
      <Typography component='p' variant='body1'>
        {registerSuccess
          ? "We have sent an email to your mail. Please check it."
          : "Fuck you"}
      </Typography>
      <AuthLink
        href='/auth/login'
        className='notifi__link-login'
        content='Go to login page'
      />
    </StyledAuthRegisterNotification>
  );
};

const AuthRegisterContent = createAuthContent(RegisterSide.FORM, {
  [RegisterSide.FORM]: AuthRegisterForm,
  [RegisterSide.NOTIFICATION]: AuthRegisterNotification,
});
export default AuthRegisterContent;
