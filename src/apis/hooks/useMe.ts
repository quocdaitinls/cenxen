import {useQuery} from "react-query";
import {userKeys} from ".";
import {useAppGQLApis} from "../gql";

const useMe = () => {
  const apis = useAppGQLApis();
  return useQuery(userKeys.me, apis.me());
};

export default useMe;
