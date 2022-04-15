import {useGQLApiMutation} from "@hooks/api/useGQLApiMutation";
import {Button} from "@mui/material";
import {Formik} from "formik";
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleLogo from "../../public/google_logo.png";
import {useLoginFormConfig} from "./hooks/useLoginForm";
import AuthLink from "./shared/AuthLink";
import {AuthSubmitButton} from "./shared/AuthSubmitButton";
import {AuthTextField} from "./shared/AuthTextField";
import {
  StyledAuthLoginForm,
  StyledThirdPartyLogin,
} from "./styles/AuthLoginFormContent.styles";
import {AuthContentSideFC, createAuthContent} from "./util/createAuthContent";

const GoogleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

enum LoginSide {
  FORM,
}

type LoginWithGoogleButtonProps = {
  className: string;
};

type ThirdPartyLoginProps = {
  className?: string;
};

const LoginWithGoogleButton: React.FC<LoginWithGoogleButtonProps> = (props) => {
  const loginWithGoogle = useGQLApiMutation(
    (apisMap) => apisMap.loginWithGoogle,
    {
      onSuccess: () => {},
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onLoginGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (response.hasOwnProperty("tokenId")) {
      const {tokenId} = response as GoogleLoginResponse;
      loginWithGoogle.mutate({input: {token: tokenId}});
    }
  };

  const onLoginGoogleFailure = (err: Error) => {
    console.log("Login with Google failure.");
  };

  return (
    <GoogleLogin
      clientId={GoogleClientID}
      onSuccess={onLoginGoogleSuccess}
      onFailure={onLoginGoogleFailure}
      render={(renderProps) => (
        <Button
          className={props.className}
          onClick={renderProps.onClick}
          variant='contained'
          size='large'
          fullWidth
          startIcon={
            <Image src={GoogleLogo} alt='google_logo' width={18} height={18} />
          }
        >
          Log in with Google
        </Button>
      )}
    />
  );
};

const ThirdPartyLogin: React.FC<ThirdPartyLoginProps> = (props) => {
  return (
    <StyledThirdPartyLogin component='div'>
      <LoginWithGoogleButton className='box-login__button' />
    </StyledThirdPartyLogin>
  );
};

const AuthLoginForm: AuthContentSideFC<LoginSide> = ({changeSide}) => {
  const router = useRouter();

  const login = useGQLApiMutation((apisMap) => apisMap.login, {
    apiConfig: (api) => api.configure({}),
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error: Error) => {},
  });

  const formConfig = useLoginFormConfig({
    onSubmit: async (values) => {
      login.mutate({input: values});
    },
  });

  return (
    <Formik {...formConfig}>
      {(form) => (
        <StyledAuthLoginForm onSubmit={form.handleSubmit}>
          <AuthTextField placeholder='Username' name='username' required />
          <AuthTextField
            placeholder='Password'
            name='password'
            type='password'
            required
          />

          <AuthLink
            href='/auth/forgotpassword'
            className='form__link-forgot'
            content='Forgot password?'
          />

          <AuthSubmitButton loading={login.isLoading} content='Login' />

          <ThirdPartyLogin />

          <AuthLink
            href='/auth/register'
            className='form__link-register'
            content="Don't have an account? Register now"
          />
        </StyledAuthLoginForm>
      )}
    </Formik>
  );
};

const AuthLoginContent = createAuthContent(LoginSide.FORM, {
  [LoginSide.FORM]: AuthLoginForm,
});

export default AuthLoginContent;
