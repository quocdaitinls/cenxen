import AuthBox from "@components/auth/AuthBox";
import AuthResetPasswordContent from "@components/auth/AuthResetPasswordContent";
import {NextPage} from "next";
import {useRouter} from "next/router";

const AuthResetPasswordPage: NextPage = () => {
  return (
    <AuthBox title='Reset Password'>
      <AuthResetPasswordContent />
    </AuthBox>
  );
};

export default AuthResetPasswordPage;
