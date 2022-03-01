import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurRoom } from "../reducers/mesageSlice";
import { CreateRoomModal, JoinRoomModal } from "./Modal";

function Room({ room }: { room: room }) {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: any) => state.message.currentRoom);

  const selectRoom = () => {
    dispatch(setCurRoom(room.id));
  };

  return (
    <div
      className={`mt-1 mx-2 py-1 px-2 cursor-pointer text-white w-full rounded ${
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
  const [roomButtons, setRoomButtons] = useState(false);
  const [joinModalOpen, setJoinModal] = useState(false);
  const [createModalOpen, setCreateModal] = useState(false);
  return (
    <div className="room-col flex flex-col items-center w-28 bg-blue-400 text-white">
      <div className="flex flex-col items-center w-full px-2">
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
      {roomButtons ? (
        <div className="mt-auto w-full">
          <div
            className="bg-blue-600 w-full pl-auto cursor-pointer text-center"
            onClick={() => {
              setJoinModal(true);
              setRoomButtons(false);
            }}
          >
            Join
          </div>
          <div
            className="bg-blue-600 w-full pl-auto cursor-pointer text-center mt-1"
            onClick={() => {
              setCreateModal(true);
              setRoomButtons(false);
            }}
          >
            Create
          </div>
          <div
            className="bg-blue-600 w-full pl-auto cursor-pointer text-center mt-1"
            onClick={() => setRoomButtons(false)}
          >
            X
          </div>
        </div>
      ) : (
        <div
          className="bg-blue-600 w-full mt-auto pl-auto cursor-pointer text-center"
          onClick={() => setRoomButtons(true)}
        >
          +
        </div>
      )}
      <CreateRoomModal open={createModalOpen} setOpen={setCreateModal} />
      <JoinRoomModal open={joinModalOpen} setOpen={setJoinModal} />
    </div>
  );
}

export default RoomSelector;
