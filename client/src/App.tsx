import React, { useState } from "react";
import ChatArea from "./components/ChatArea";
import MsgInput from "./components/MsgInput";
import Message from "./components/Message";

import io from "socket.io-client";

const socket = io();

interface msg {
  newMsg: string;
  creator: string;
  timeStamp: string;
}

function App() {
  const [msgs, updateMsgs] = useState<msg[] | []>([]);

  socket.on("receive-msg", (payLoad: msg) => {
    console.log(payLoad);
    updateMsgs([...msgs, payLoad]);
  });
  const addOwnMsg = (newMsg: msg) => {
    updateMsgs([...msgs, newMsg]);
  };

  return (
    <div
      className="App flex flex-col bg-white"
      style={{ height: "700px", width: "500px" }}
    >
      <header className="text-white bg-blue-600 p-3 px-5">
        Simple Chat App
      </header>
      <ChatArea msgs={msgs} socketId={socket.id} />
      <MsgInput addOwnMsg={addOwnMsg} socket={socket} />
    </div>
  );
}

export default App;
