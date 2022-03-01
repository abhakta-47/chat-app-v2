import React, { CSSProperties, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";

import { initUser } from "./reducers/userSlice";

import RoomSelector from "./components/RoomSelector";
import ChatArea from "./components/ChatArea";
import MsgInput from "./components/MsgInput";

function App() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [userName, setUser] = useState("");
  const handleKeyDown = (e: { key: string; any?: any }) => {
    if (e.key === "Enter") {
      dispatch(initUser(userName));
    }
  };
  // console.log(user);
  const initContent = (
    <div className="mt-2 flex justify-center">
      <input
        autoFocus
        value={userName}
        className="bg-gray-100 h-full mx-2"
        onChange={(e) => setUser(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        type="text"
        id="userNameInput"
      />
      <button
        className="bg-green-600 text-white px-3 py-1"
        onClick={(e) => dispatch(initUser(userName))}
      >
        save
      </button>
    </div>
  );
  let [showMenu, setShowMenu] = useState(true);
  const roomColStyles = (): CSSProperties => {
    if (window.innerWidth <= 600 && !showMenu)
      return {
        display: "none",
      };
    else return {};
  };
  const chatColStyles = (): CSSProperties => {
    if (window.innerWidth <= 600 && showMenu)
      return {
        display: "none",
      };
    else return {};
  };
  const userContent = (
    <div className="flex flex-grow min-h-0">
      <div className="room-col w-28" style={roomColStyles()}>
        <RoomSelector setShowMenu={setShowMenu} />
      </div>
      <div className="flex-grow flex flex-col" style={chatColStyles()}>
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
    <div className="App flex flex-col bg-white mx-auto my-auto">
      <header className="text-xl text-white bg-blue-600 py-3 pl-2 px-5 flex">
        {!showMenu ? (
          <button className="mr-1" onClick={() => setShowMenu(true)}>
            <AiOutlineMenu></AiOutlineMenu>
          </button>
        ) : (
          ""
        )}
        React Chat App
      </header>
      {actualContent()}
    </div>
  );
}

export default App;
