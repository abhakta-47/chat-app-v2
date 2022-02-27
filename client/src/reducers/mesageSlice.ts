import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import curTime from "../utils/date";

const initialStateChat: state = {
  currentRoom: "",
  rooms: [],
  socket: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialStateChat,
  reducers: {
    joinRoom: {
      reducer: (state, action: PayloadAction<room>) => {
        state.rooms.push(action.payload);
      },
      prepare: (roomId: string) => {
        return {
          payload: {
            id: roomId,
            name: roomId,
            messages: [],
          },
        };
      },
    },
    setCurRoom: (state, action) => {
      // console.log(action.payload);
      state.currentRoom = action.payload;
    },
    sendMessage: {
      reducer: (state: any, action: PayloadAction<msg>) => {
        // action.payload.to = state.currentRoom;
        const roomIndex: number = state.rooms.findIndex((room: room) => {
          return room.id === action.payload.to;
        });
        action.payload.type = "self";
        state.rooms[roomIndex].messages.push(action.payload);
      },
      prepare: (msgTxt: { content: string; to: string }) => {
        // const user: user = store.getState().user;
        let msgPayload: msg = {
          content: msgTxt.content,
          from: { name: "user.name", id: "user.id" },
          to: msgTxt.to,
          timeStamp: curTime(),
          type: "self",
        };
        return {
          payload: msgPayload,
        };
      },
    },
    recieveMessage: (state, action) => {
      const roomIndex: number = state.rooms.findIndex((room: room) => {
        return room.id === action.payload.to;
      });
      state.rooms[roomIndex].messages.push(action.payload);
    },
    welcomePeer: (state, action) => {
      const roomIndex: number = state.rooms.findIndex((room: room) => {
        return room.id === action.payload.room;
      });
      let welcomeMsg: msg = {
        content: action.payload.userName + " joined",
        from: { name: action.payload.userName },
        to: action.payload.room,
        timeStamp: curTime(),
        type: "bot",
      };
      state.rooms[roomIndex].messages.push(welcomeMsg);
    },
  },
});

export const {
  joinRoom,
  setCurRoom,
  sendMessage,
  recieveMessage,
  welcomePeer,
} = chatSlice.actions;

export default chatSlice.reducer;
