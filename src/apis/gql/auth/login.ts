import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const LoginGQL = gql`
  mutation Login($input: Input_Login!) {
    login(input: $input) {
      access_token
      refresh_token
    }
  }
`;

export type LoginVariables = {
  input: {
    username: string;
    password: string;
  };
};

export type LoginData = {
  login: {
    access_token: string;
    refresh_token: string;
  };
};

export default createGQLApiBuilder<LoginVariables, LoginData>(LoginGQL);
