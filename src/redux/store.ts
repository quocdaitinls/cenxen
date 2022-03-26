import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {cexWsMid} from "./middlewares";
import {ChatReducer, GlobalReducer, UserReducer} from "./slices";

export const buildStore = () => {
  return configureStore({
    reducer: {
      global: GlobalReducer,
      user: UserReducer,
      chat: ChatReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cexWsMid),
  });
};

const store = buildStore();

export type AppStore = typeof store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
