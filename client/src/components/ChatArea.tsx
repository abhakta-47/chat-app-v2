import { stat } from "fs";
import React from "react";
import { useSelector } from "react-redux";
import store from "../store";

import Message from "./Message";
interface msg {
  newMsg: string;
  creator: string;
  timeStamp: string;
}

function ChatArea() {
  const msgs: [] | msg[] = useSelector(
    (state: { message: msg[] }) => state.message
  );
  return (
    <div className="flex flex-col flex-grow p-2">
      {msgs.map((msg) => (
        <Message key={msg.timeStamp} msg={msg} />
      ))}
    </div>
  );
}

export default ChatArea;
