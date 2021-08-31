import React, { useState } from "react";
import { Provider } from "react-redux";

import socket from "./utils/socket";

import ChatArea from "./components/ChatArea";
import MsgInput from "./components/MsgInput";
import Message from "./components/Message";

interface msg {
  newMsg: string;
  creator: string;
  timeStamp: string;
}

function App() {
  const [msgs, updateMsgs] = useState<msg[] | []>([]);

  // socket.on("receive-msg", (payLoad: msg) => {
  //   console.log(payLoad);
  //   updateMsgs([...msgs, payLoad]);
  // });
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
      <ChatArea />
      <MsgInput addOwnMsg={addOwnMsg} />
    </div>
  );
}

export default App;
