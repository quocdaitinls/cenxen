import {AnyAction, Middleware} from "@reduxjs/toolkit";
import {CexWs} from "src/socket";

export const deletePrefixActionType = (action: AnyAction) => {};

export const createWsMiddleware = (): Middleware => {
  return (store) => (next) => (action) => {
    const {socket} = CexWs.ins();
    if (action.type === "chat/emitTest")
      socket.emit("new_message", {content: action.payload});
    console.log(action);
    next(action);
  };
};

export const cexWsMid = createWsMiddleware();
