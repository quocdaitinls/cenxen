import {useAppGQLApis} from "@apis/gql";
import {useMutation} from "react-query";
import {
  GQLApi_ApiConfig,
  GQLApi_ExtractApiFnc,
  GQLApi_UseMutationOptions,
} from "./types";

export function useGQLApiMutation<TData, TError, TVariables, TContext>(
  extractFnc: GQLApi_ExtractApiFnc<TVariables, TData>,
  options?: GQLApi_UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const apisMap = useAppGQLApis();
  const api = extractFnc(apisMap);
  const defaultApiConfig: GQLApi_ApiConfig<TVariables, TData> = {
    onSuccess: (data) => data,
    onError: (error) => {
      for (let err of error) throw Error(err.message);
    },
  };

  api.clearConfig();
  api.configure(defaultApiConfig);

  if (typeof options?.apiConfig === "function") options.apiConfig(api);
  else api.configure(options?.apiConfig || {});

  return useMutation(
    (value: TVariables) => api.setVariables(value).exec(),
    options
  );
}
