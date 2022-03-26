import AuthBox from "@components/auth/AuthBox";
import AuthLoginContent from "@components/auth/AuthLoginContent";
import {NextPage} from "next";

const AuthLoginPage: NextPage = () => {
  return (
    <AuthBox title='Login'>
      <AuthLoginContent />
    </AuthBox>
  );
};

export default AuthLoginPage;
