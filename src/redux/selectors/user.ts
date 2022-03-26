import {useAppSelector} from "../store";

export const useUser = () => {
  const user = useAppSelector((state) => state.user);
  return user;
};
