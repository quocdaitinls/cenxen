import {createGQLApiBuilder} from "gql-apis-store";
import {gql} from "graphql-request";

export const FetchTasksGQL = gql`
  query fetchTasks {
    tasks {
      id
      name
    }
  }
`;

export const fetchTasks = createGQLApiBuilder<string[]>(FetchTasksGQL);
