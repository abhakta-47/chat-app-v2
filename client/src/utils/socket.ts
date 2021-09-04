import { io } from "socket.io-client";

import store from "../store";
import { recieveMessage } from "../reducers/mesageSlice";

console.log("prc envs", process.env);

const BACKEND_SERVER =
  "https://chat-app-v2-back.herokuapp.com/" || "http://localhost:5000";

const socket = io(BACKEND_SERVER, {
  transports: ["websocket", "polling", "flashsocket"],
});
socket.on("receive-msg", (payload: any) => {
  store.dispatch(recieveMessage(payload));
});
console.log("called");
export default socket;
