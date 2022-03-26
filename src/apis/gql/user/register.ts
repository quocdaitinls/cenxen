import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const RegisterGQL = gql`
  mutation Register($input: Input_Register!) {
    register(input: $input)
  }
`;

export type RegisterVariables = {
  input: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
  };
};

export type RegisterData = {
  register: boolean;
};

export default createGQLApiBuilder<RegisterVariables, RegisterData>(
  RegisterGQL
);
