import socket from "../utils/socket";

declare global {
  interface msg {
    newMsg: string;
    creator: string;
    timeStamp: string;
  }
}

export const sendMessage = (
  newMsg: msg
): { type: string; payLoad: { newMessage: msg } } => {
  socket.emit("new-msg", newMsg);
  return {
    type: "SEND_MESSAGE",
    payLoad: {
      newMessage: newMsg,
    },
  };
};

export const recieveMessage = (
  newMsg: msg
): { type: string; payLoad: { newMessage: msg } } => ({
  type: "RECIEVE_MESSAGE",
  payLoad: { newMessage: newMsg },
});

const initState: msg[] = [];

const messageReducer = (
  state = initState,
  action: { type: string; payLoad: { newMessage: msg } }
) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return [...state, action.payLoad.newMessage];
      break;
    case "RECIEVE_MESSAGE":
      return [...state, action.payLoad.newMessage];
      break;
    default:
      return state;
      break;
  }
};

export default messageReducer;
