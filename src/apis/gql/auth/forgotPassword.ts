import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const ForgotPasswordGQL = gql`
  mutation ForgotPassword($input: Input_ForgotPassword!) {
    forgot_password(input: $input)
  }
`;

export type ForgotPasswordVariables = {
  input: {
    email: string;
  };
};

export type ForgotPasswordData = {
  forgot_password: boolean;
};

export default createGQLApiBuilder<ForgotPasswordVariables, ForgotPasswordData>(
  ForgotPasswordGQL
);
