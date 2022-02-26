import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurRoom } from "../reducers/mesageSlice";
import Modal from "./Modal";

function Room({ room }: { room: room }) {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: any) => state.message.currentRoom);

  const selectRoom = () => {
    dispatch(setCurRoom(room.id));
  };

  return (
    <div
      className={`cursor-pointer text-white pl-2 w-full ${
        room.id === currentRoom ? "bg-blue-600" : ""
      }`}
      id={room.id}
      onClick={selectRoom}
    >
      {room.name}
    </div>
  );
}

function RoomSelector() {
  const rooms: room[] = useSelector(
    (state: { message: state }) => state.message.rooms
  );
  const [modalOpen, setModal] = useState(false);
  return (
    <div className="flex flex-col items-center w-20 bg-blue-400 text-white">
      {rooms.map((room) => (
        <Room key={room.id} room={room} />
      ))}
      <div
        className="bg-blue-600 w-full mt-auto pl-auto cursor-pointer text-center"
        onClick={() => setModal(true)}
      >
        +
      </div>
      <Modal open={modalOpen} setOpen={setModal} />
    </div>
  );
}

export default RoomSelector;
