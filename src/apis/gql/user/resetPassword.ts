import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const ResetPasswordGQL = gql`
  mutation ResetPassword($input: Input_ResetPassword!) {
    reset_password(input: $input)
  }
`;

export type ResetPasswordVariables = {
  input: {
    token: string;
    new_password: string;
  };
};

export type ResetPasswordData = {
  reset_password: boolean;
};

export default createGQLApiBuilder<ResetPasswordVariables, ResetPasswordData>(
  ResetPasswordGQL
);
