import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface GlobalState {}

type GlobalReducer<R = any> = CaseReducer<GlobalState, PayloadAction<R>>;

const initialState: GlobalState = {};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const GlobalActions = globalSlice.actions;
export default globalSlice.reducer;
