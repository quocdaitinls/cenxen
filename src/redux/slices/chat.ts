import {CaseReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Message {}

export interface ChatRoom {
  id: string;
  name: string;
  messages: [Message];
}

export interface ChatState {
  current: string;
  chatrooms: {
    [chatroomId: string]: ChatRoom;
  };
  //
  test: string;
}

type ChatReducer<R = any> = CaseReducer<ChatState, PayloadAction<R>>;

const initialState: ChatState = {
  current: null,
  chatrooms: {},
  test: "",
};

const test: ChatReducer<string> = (state, action) => {
  state.test = action.payload;
};

const emitTest: ChatReducer<string> = (state, action) => {
  state.test = action.payload;
};

const newMessage: ChatReducer = (state, action) => {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    test,
    emitTest,
  },
});

export const ChatActions = chatSlice.actions;
export default chatSlice.reducer;
