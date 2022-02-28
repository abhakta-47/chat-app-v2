import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/mesageSlice";
import userReducer from "./reducers/userSlice";

import { setBrowserDB } from "./utils/indexedDB";
import socket, { socketMiddleware } from "./utils/socket";
import { userMiddleware } from "./utils/userMiddleWare";
import { loadState, saveState } from "./utils/reduxSaveState";

const reducer = { user: userReducer, message: chatReducer };

// const socket = io();
let preloadedState: any = loadState();
if (preloadedState) {
  if (preloadedState.message)
    preloadedState.message.rooms.forEach((room: room) =>
      socket.emit("join-room", {
        room: room.id,
        userName: preloadedState.user.name,
        userId: preloadedState.user.id,
      })
    );
  // if(preloadedState.user)

  // console.log("state load done");
}

setBrowserDB();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userMiddleware)
      .concat(socketMiddleware(socket)),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
