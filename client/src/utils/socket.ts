import { io } from "socket.io-client";

import store from "../store";
import { recieveMessage } from "../reducers/mesageSlice";

const socket = io();
socket.on("receive-msg", (payload: any) => {
  store.dispatch(recieveMessage(payload));
});
console.log("called");
export default socket;
