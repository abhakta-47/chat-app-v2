import socket from "../utils/socket";

const curTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

declare global {
  interface msg {
    content: string;
    from: string;
    to: string;
    timeStamp: string;
  }
  interface room {
    name: string;
    id: string;
    messages: msg[];
    users?: [];
  }

  interface user {
    name: string;
    id?: string;
    pubkey?: string;
  }

  interface state {
    currentRoom: string;
    rooms: room[];
  }

  interface action {
    type: string;
    payLoad: any;
  }
}

export const sendMessage = (newMsg: string): action => {
  return {
    type: "SEND_MESSAGE",
    payLoad: {
      content: newMsg,
    },
  };
};

export const recieveMessage = (newMsg: msg): action => ({
  type: "RECIEVE_MESSAGE",
  payLoad: { newMessage: newMsg },
});

export const setRoom = (roomId: string): action => ({
  type: "SET_CUR_ROOM",
  payLoad: { roomId: roomId },
});

export const joinRoom = (roomId: string): action => ({
  type: "JOIN_ROOM",
  payLoad: { roomId: roomId },
});

const initState: state = {
  currentRoom: "01",
  rooms: [
    {
      name: "test",
      id: "01",
      messages: [],
    },
  ],
};

const messageReducer = (
  state = initState,
  action: { type: string; payLoad: any }
) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      const newMsg: msg = {
        content: action.payLoad.content,
        from: socket.id,
        to: state.currentRoom,
        timeStamp: curTime(),
      };
      socket.emit("new-msg", newMsg);
      state.rooms.map((room) => {
        if (room.id === newMsg.to) {
          room.messages = [...room.messages, newMsg];
        }
        return room;
      });
      return state;
    case "RECIEVE_MESSAGE":
      state.rooms.map((room) => {
        if (room.id === action.payLoad.newMessage.to) {
          room.messages = [...room.messages, action.payLoad.newMessage];
        }
        return room;
      });
      return state;
    case "SET_CUR_ROOM":
      console.log("SET_ROOM", action.payLoad.roomId);
      state.currentRoom = action.payLoad.roomId;
      return state;
    case "JOIN_ROOM":
      socket.emit("join-room", { room: action.payLoad.roomId });
      state.rooms = [
        ...state.rooms,
        {
          name: action.payLoad.roomId,
          id: action.payLoad.roomId,
          messages: [],
        },
      ];
      return state;
    default:
      return state;
  }
};

export default messageReducer;
