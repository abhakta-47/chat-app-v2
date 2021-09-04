import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initUser } from "./reducers/userSlice";

import RoomSelector from "./components/RoomSelector";
import ChatArea from "./components/ChatArea";
import MsgInput from "./components/MsgInput";

function App() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [userName, setUser] = useState("");
  // console.log(user);
  if (user.name === "no-init") {
    return (
      <div
        className="App flex flex-col bg-white"
        style={{ height: "700px", width: "500px" }}
      >
        <header className="text-white bg-blue-600 p-3 px-5">
          Simple Chat App
        </header>
        <div>
          <input
            value={userName}
            onChange={(e) => setUser(e.target.value)}
            type="text"
          />
          <button onClick={(e) => dispatch(initUser(userName))}>save</button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="App flex flex-col bg-white"
      style={{ height: "700px", width: "500px" }}
    >
      <header className="text-white bg-blue-600 p-3 px-5">
        Simple Chat App
      </header>

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
