import {gql} from "graphql-request";
import {BasicFile} from "./File";

export const Profile = gql`
  fragment Profile on User {
    profile {
      name
      avatar {
        ...BasicFile
      }
      email
      phone
    }
  }

  ${BasicFile}
`;
