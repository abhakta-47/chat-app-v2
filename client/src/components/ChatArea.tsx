import React from "react";
import Message from "./Message";
interface msg {
  newMsg: string;
  creator: string;
  timeStamp: string;
}

function ChatArea({ msgs, socketId }: { msgs: [] | msg[]; socketId: string }) {
  return (
    <div className="flex flex-col flex-grow p-2">
      {msgs.map((msg) => (
        <Message msg={msg} socketId={socketId} />
      ))}
    </div>
  );
}

export default ChatArea;
