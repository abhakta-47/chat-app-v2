import io from "socket.io-client";
import { recieveMessage } from "../reducers/mesageReducer";
import store from "../store";

const socket = io();

socket.on("receive-msg", (payLoad: msg) => {
  console.log(payLoad);
  store.dispatch(recieveMessage(payLoad));
});

export default socket;
