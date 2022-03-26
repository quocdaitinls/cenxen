import AuthBox from "@components/auth/AuthBox";
import AuthForgotPasswordContent from "@components/auth/AuthForgotPasswordContent";
import {NextPage} from "next";

const AuthForgotPasswordPage: NextPage = () => {
  return (
    <AuthBox title='Forgot Password'>
      <AuthForgotPasswordContent />
    </AuthBox>
  );
};

export default AuthForgotPasswordPage;
