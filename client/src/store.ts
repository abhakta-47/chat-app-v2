import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/mesageSlice";
import userReducer from "./reducers/userSlice";

import { socketInit } from "./reduxSocketMiddleWare";

import socket from "./utils/socket";

const reducer = { user: userReducer, chats: chatReducer };

// const socket = io();
let savedData = localStorage.getItem("state");
let preloadedState: any;
if (savedData) {
  preloadedState = JSON.parse(savedData);
  if (preloadedState.message)
    preloadedState.message.rooms.forEach((room: room) =>
      socket.emit("join-room", { room: room.id })
    );
  console.log("state load done");
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketInit(socket)),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

store.subscribe(() => {
  // console.log("saving..");
  // const curState = store.getState();
  localStorage.setItem("state", JSON.stringify(store.getState()));
  console.log("saving done");
});

export default store;
