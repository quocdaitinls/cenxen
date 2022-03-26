import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";
import {Profile} from "../fragments/User";

export const MeGQL = gql`
  query Me {
    me {
      id
      ...Profile
    }
  }

  ${Profile}
`;

export default createGQLApiBuilder<any>(MeGQL);
