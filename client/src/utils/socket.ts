import { io } from "socket.io-client";

import store from "../store";
import { recieveMessage, welcomePeer } from "../reducers/mesageSlice";

// console.log("prc envs", process.env);
let BACKEND_SERVER: string = "";
if (process.env.NODE_ENV === "development")
  BACKEND_SERVER = "http://localhost:5000";
else BACKEND_SERVER = "/";

const socket = io(BACKEND_SERVER, {
  transports: ["websocket", "polling", "flashsocket"],
});
socket.on("receive-msg", (payload: any) => {
  store.dispatch(recieveMessage(payload));
});
socket.on("new-peer", (payload: any) => {
  store.dispatch(welcomePeer(payload));
});
export default socket;

export const socketMiddleware =
  (socket: any) => (storeAPI: any) => (next: any) => (action: any) => {
    const getUser = (): user => {
      // console.log("user state got");
      return storeAPI.getState().user;
    };
    let userState: user;
    switch (action.type) {
      case "chat/joinRoom":
        userState = getUser();
        socket.emit("join-room", {
          room: action.payload.id,
          userName: userState.name,
          userId: userState.id,
        });
        break;
      case "chat/sendMessage":
        // console.log("send msg middle war");
        userState = getUser();
        action.payload.from = { name: userState.name, id: userState.id };
        let msgPayload: msg = action.payload;
        msgPayload.type = "peer";
        // console.log(msgPayload);
        socket.emit("new-msg", action.payload);
        break;
      default:
        break;
    }
    return next(action);
  };
