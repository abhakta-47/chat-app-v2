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
        // console.log(state);
        // state.socket.emit("join-room", { room: action.payload.id });
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
        state.rooms[0].messages.push(action.payload);
      },
      prepare: (msgTxt: any) => {
        return {
          payload: {
            content: msgTxt.content,
            from: "me",
            to: msgTxt.to,
            timeStamp: curTime(),
          },
        };
      },
    },
    recieveMessage: (state, action) => {
      // state.rooms[0].messages.push(action.payload);
      const room: room[] = state.rooms.filter((room) => {
        return room.id === action.payload.to;
      });
      if (room.length === 1) room[0].messages.push(action.payload);
    },
  },
});

export const { joinRoom, setCurRoom, sendMessage, recieveMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
