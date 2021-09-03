import React from "react";

import RoomSelector from "./components/RoomSelector";
import ChatArea from "./components/ChatArea";
import MsgInput from "./components/MsgInput";

function App() {
  return (
    <div
      className="App flex flex-col bg-white"
      style={{ height: "700px", width: "500px" }}
    >
      <header className="text-white bg-blue-600 p-3 px-5">
        Simple Chat App
      </header>
      {/* <button onClick={() => dispatch(sendMessage({ id: "04", messages: [] }))}>
        buttom
      </button> */}
      <div className="flex h-full">
        <RoomSelector />
        <div className="flex-grow flex flex-col">
          <ChatArea />
          <MsgInput />
        </div>
      </div>
    </div>
  );
}

export default App;
