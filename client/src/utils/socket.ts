import { io } from "socket.io-client";

import store from "../store";
import { recieveMessage } from "../reducers/mesageSlice";

// console.log("prc envs", process.env);
let BACKEND_SERVER: string = "";
if (process.env.NODE_ENV === "development")
  BACKEND_SERVER = "http://localhost:5000";
else BACKEND_SERVER = "https://chat-app-v2-back.herokuapp.com/";

const socket = io("/", {
  transports: ["websocket", "polling", "flashsocket"],
});
socket.on("receive-msg", (payload: any) => {
  store.dispatch(recieveMessage(payload));
});
console.log("called");
export default socket;
