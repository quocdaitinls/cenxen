import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const LoginWithGoogleGQL = gql`
  mutation LoginWithGoogle($input: Input_LoginWithGoogle!) {
    login_with_google(input: $input) {
      access_token
      refresh_token
    }
  }
`;

export type LoginWithGoogleVariables = {
  input: {
    token: string;
  };
};

export type LoginWithGoogleData = {
  login_with_google: {
    access_token: string;
    refresh_token: string;
  };
};

export default createGQLApiBuilder<
  LoginWithGoogleVariables,
  LoginWithGoogleData
>(LoginWithGoogleGQL);
