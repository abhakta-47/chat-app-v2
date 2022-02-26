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
        const roomIndex: number = state.rooms.findIndex((room: room) => {
          return room.id === action.payload.to;
        });
        state.rooms[roomIndex].messages.push(action.payload);
      },
      prepare: (msgTxt: any) => {
        // const user: user = store.getState().user;
        return {
          payload: {
            content: msgTxt.content,
            from: { name: "user.name", id: "user.id" },
            to: msgTxt.to,
            timeStamp: curTime(),
          },
        };
      },
    },
    recieveMessage: (state, action) => {
      const roomIndex: number = state.rooms.findIndex((room: room) => {
        return room.id === action.payload.to;
      });
      state.rooms[roomIndex].messages.push(action.payload);
    },
  },
});

export const { joinRoom, setCurRoom, sendMessage, recieveMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
