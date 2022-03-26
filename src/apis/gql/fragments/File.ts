import {gql} from "graphql-request";

export const BasicFile = gql`
  fragment BasicFile on File {
    id
    name
    ext
    url
    put_url
    is_uploaded
    is_deleted
    creator_id
    created_at
  }
`;
