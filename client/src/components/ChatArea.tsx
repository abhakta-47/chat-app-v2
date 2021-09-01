import React from "react";
import { useSelector } from "react-redux";

import Message from "./Message";

function ChatArea() {
  const currentRoom = useSelector((state: any) => state.message.currentRoom);
  const msgs: [] | msg[] = useSelector(
    (state: { message: state }) =>
      state.message.rooms.filter((room) => room.id === currentRoom)[0].messages
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
