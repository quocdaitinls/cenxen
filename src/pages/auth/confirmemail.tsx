import {apisStore} from "@apis/gql";
import AuthBox from "@components/auth/AuthBox";
import AuthConfirmEmailContent from "@components/auth/AuthConfirmEmailContent";
import {GetServerSideProps, NextPage} from "next";

interface MyProps {
  success: boolean;
}

const AuthConfirmEmailPage: NextPage<MyProps> = ({success}) => {
  return (
    <AuthBox title='Confirm Email'>
      <AuthConfirmEmailContent success={success} />
    </AuthBox>
  );
};

export const getServerSideProps: GetServerSideProps<MyProps> = async (
  context
) => {
  const {query} = context;

  const data = await apisStore.apis.confirmEmail
    .setVariables({input: {token: query?.token as string}})
    .exec();
  return {props: {success: data.confirm_email}};
};

export default AuthConfirmEmailPage;
