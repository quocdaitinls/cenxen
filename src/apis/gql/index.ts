import {Store, GraphQLClientOptions, useGQLApis} from "gql-apis-store";
import {AuthApiBuilders} from "./auth";
import {TaskApiBuilders} from "./task";
import {UserApiBuilder} from "./user";

export const clientConfig: GraphQLClientOptions = {
  url: "http://localhost:3000/api/graphql",
};

export const apisStore = new Store({
  client: clientConfig,
  builders: [AuthApiBuilders, TaskApiBuilders, UserApiBuilder],
});

export const useAppGQLApis = () => useGQLApis<typeof apisStore>();
