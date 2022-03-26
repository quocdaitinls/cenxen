import {useAppGQLApis} from "@apis/gql";
import {ApiOptions, GQLApi} from "gql-apis-store";
import {UseMutationOptions} from "react-query";

export type GQLApi_ExtractApiFnc<TVariables, TData> = (
  apisMap: ReturnType<typeof useAppGQLApis>
) => GQLApi<TVariables, TData>;

export type GQLApi_ApiConfig<TVariables, TData> = Omit<
  ApiOptions<TVariables, TData>,
  "reqOpts"
>;

export type GQLApi_ApiFunctionConfig<TVariables, TData> = (
  api: GQLApi<TVariables, TData>
) => GQLApi<TVariables, TData>;

export type GQLApi_BaseUseMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

export type GQLApi_ExpandApiConfig<TVariables, TData> = {
  apiConfig?:
    | GQLApi_ApiConfig<TVariables, TData>
    | GQLApi_ApiFunctionConfig<TVariables, TData>;
};

export type GQLApi_UseMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
> = GQLApi_BaseUseMutationOptions<TData, TError, TVariables, TContext> &
  GQLApi_ExpandApiConfig<TVariables, TData>;
