import React from "react";

function Message({ msg }: { msg: msg }) {
  const style = () => {
    if (msg.from === "tst")
      return "max-w-sm bg-blue-500 text-white mt-2 p-2 rounded-md rounded-tr21-none self-end";

    return "max-w-sm bg-purple-500 text-white mt-2 p-2 rounded-md rounded-tl-none";
  };

  return (
    <div className={style()}>
      <div className="msg-content ">{msg.content}</div>
      <span className="flex justify-end text-xs text-gray-300">
        <div className="msg-creator mr-1">{msg.from}</div>
        <div className="msg-timestamp">{msg.timeStamp}</div>
      </span>
    </div>
  );
}

export default Message;
