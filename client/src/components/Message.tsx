import React from "react";
// import { useSelector } from "react-redux";

function Message({ msg }: { msg: msg }) {
  // const user = useSelector((state: any) => state.user);
  const commonStyle = "w-max text-white mt-2 p-2 rounded-md ";
  const style = () => {
    if (msg.type === "self")
      return commonStyle + "bg-blue-500 rounded-tr21-none self-end";

    return commonStyle + "bg-purple-500 rounded-tl-none";
  };

  const createMsgElement = (msg: msg) => {
    if (msg.type === "bot")
      return (
        <div className="flex my-1">
          <p className="ml-auto text-gray-500 text-sm">{msg.content}</p>
          <p className="ml-auto text-gray-500 text-sm">{msg.timeStamp}</p>
        </div>
      );

    return (
      <div className={style()}>
        <div className="msg-content ">{msg.content}</div>
        <span className="flex justify-end text-xs text-gray-300">
          <div className="msg-creator mr-1">{msg.from.name}</div>
          <div className="msg-timestamp">{msg.timeStamp}</div>
        </span>
      </div>
    );
  };
  return createMsgElement(msg);
}

export default Message;
