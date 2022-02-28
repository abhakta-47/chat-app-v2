import { io } from "socket.io-client";

import store from "../store";
import { getKey, addKey } from "./indexedDB";
import { genUUID, genKey, encrypt, decrypt } from "./crypto/pbkdf2";
import { recieveMessage, welcomePeer } from "../reducers/mesageSlice";

// console.log("prc envs", process.env);
let BACKEND_SERVER: string = "";
if (process.env.NODE_ENV === "development")
  BACKEND_SERVER = "http://localhost:5000";
else BACKEND_SERVER = "/";

const socket = io(BACKEND_SERVER, {
  transports: ["websocket", "polling", "flashsocket"],
});

socket.on("receive-msg", (payload: any) => {
  getKey(payload.to).then((key) => {
    decrypt(payload.payload, payload.to, key).then((decryptedMsg) => {
      decryptedMsg.type = "peer";
      store.dispatch(recieveMessage(decryptedMsg));
    });
  });
});
socket.on("new-peer", (payload: any) => {
  store.dispatch(welcomePeer(payload));
});

export default socket;

export const socketMiddleware =
  (socket: any) => (storeAPI: any) => (next: any) => (action: any) => {
    const getUser = (): user => {
      // console.log("user state got");
      return storeAPI.getState().user;
    };
    let userState: user;
    switch (action.type) {
      case "chat/createRoom":
        userState = getUser();
        action.payload.id = genUUID();
        socket.emit("join-room", {
          room: action.payload.id,
          userName: userState.name,
          userId: userState.id,
        });
        genKey(action.payload.symmetricKey, action.payload.id).then((key) => {
          try {
            addKey(action.payload.id, key);
            next(action);
          } catch {
            console.error("unable to save passkey to db");
          }
        });
        return;

      case "chat/joinRoom":
        userState = getUser();
        socket.emit("join-room", {
          room: action.payload.id,
          userName: userState.name,
          userId: userState.id,
        });
        genKey(action.payload.symmetricKey, action.payload.id).then((key) => {
          try {
            addKey(action.payload.id, key);
            next(action);
          } catch {
            console.error("unable to save passkey to db");
          }
        });

        return;

      case "chat/sendMessage":
        userState = getUser();
        action.payload.from = { name: userState.name, id: userState.id };
        let msgPayload: msg = action.payload;
        msgPayload.type = "peer";
        getKey(action.payload.to).then((key) =>
          encrypt(action.payload, action.payload.to, key).then(
            (encryptedblob) =>
              socket.emit("new-msg", {
                to: action.payload.to,
                payload: encryptedblob,
              })
          )
        );
        break;
      default:
        break;
    }
    return next(action);
  };
