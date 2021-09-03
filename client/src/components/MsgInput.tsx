import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../reducers/mesageSlice";

function MsgInput() {
  const [msgTxt, updateMsgTxt] = useState("");
  const curRoom = useSelector((state: any) => state.message.currentRoom);
  const dispatch = useDispatch();

  const sendHandler = () => {
    console.log("dis send ", msgTxt);
    dispatch(sendMessage({ content: msgTxt, to: curRoom }));
  };

  return (
    <div className="flex items-center justify-center p-2">
      <input
        className="mx-2 flex-grow p-2 bg-gray-200"
        type="text"
        name="message"
        id="msg"
        onChange={(e) => {
          updateMsgTxt(e.target.value);
        }}
      />
      <button
        className="px-3 h-full text-white bg-blue-600"
        onClick={sendHandler}
      >
        send
      </button>
    </div>
  );
}

export default MsgInput;
