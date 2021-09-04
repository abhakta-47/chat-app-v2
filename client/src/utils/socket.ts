import { io } from "socket.io-client";

import store from "../store";
import { recieveMessage } from "../reducers/mesageSlice";

const BACKEND_SERVER = process.env.BACKEND_SERVER || "http://localhost:5000";

const socket = io(BACKEND_SERVER, {
  transports: ["websocket", "polling", "flashsocket"],
});
socket.on("receive-msg", (payload: any) => {
  store.dispatch(recieveMessage(payload));
});
console.log("called");
export default socket;
