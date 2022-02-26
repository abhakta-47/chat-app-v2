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
  const initContent = (
    <div className="mt-2 flex justify-center">
      <input
        value={userName}
        className="bg-gray-100 h-full mx-2"
        onChange={(e) => setUser(e.target.value)}
        type="text"
      />
      <button
        className="bg-blue-600 text-white px-3 py-1"
        onClick={(e) => dispatch(initUser(userName))}
      >
        save
      </button>
    </div>
  );
  const userContent = (
    <div className="flex h-full">
      <RoomSelector />
      <div className="flex-grow flex flex-col">
        <ChatArea />
        <MsgInput />
      </div>
    </div>
  );
  const actualContent = () => {
    if (user.name === "no-init") {
      return initContent;
    } else {
      return userContent;
    }
  };

  return (
    <div
      className="App flex flex-col bg-white"
      style={{ height: "90vh", width: "500px" }}
    >
      <header className="text-lg text-white bg-blue-600 p-3 px-5">
        React Chat App
      </header>
      {actualContent()}
    </div>
  );
}

export default App;
