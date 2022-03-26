import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const ConfirmEmailGQL = gql`
  mutation ConfirmEmail($input: Input_ConfirmEmail!) {
    confirm_email(input: $input)
  }
`;

export type ConfirmEmailVariables = {
  input: {
    token: string;
  };
};

export type ConfirmEmailData = {
  confirm_email: boolean;
};

export default createGQLApiBuilder<ConfirmEmailVariables, ConfirmEmailData>(
  ConfirmEmailGQL
);
