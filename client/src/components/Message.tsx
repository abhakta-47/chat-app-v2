import React from "react";
interface msg {
  newMsg: string;
  creator: string;
  timeStamp: string;
}
function Message({ msg, socketId }: { msg: msg; socketId: string }) {
  const style = () => {
    if (msg.creator == socketId)
      return "max-w-sm bg-blue-500 text-white mt-2 p-2 rounded-md rounded-tr21-none self-end";

    return "max-w-sm bg-purple-500 text-white mt-2 p-2 rounded-md rounded-tl-none";
  };

  return (
    <div className={style()}>
      <div className="msg-content ">{msg.newMsg}</div>
      <span className="flex justify-end text-xs text-gray-300">
        <div className="msg-creator mr-1">{msg.creator}</div>
        <div className="msg-timestamp">{msg.timeStamp}</div>
      </span>
    </div>
  );
}

export default Message;
