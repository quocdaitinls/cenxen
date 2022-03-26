import AuthBox from "@components/auth/AuthBox";
import AuthRegisterContent from "@components/auth/AuthRegisterContent";
import {NextPage} from "next";

const AuthRegisterPage: NextPage = () => {
  return (
    <AuthBox title='Register'>
      <AuthRegisterContent registerSuccess={false} />
    </AuthBox>
  );
};

export default AuthRegisterPage;
