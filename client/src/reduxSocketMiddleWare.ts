export const socketInit =
  (socket: any) => (storeAPI: any) => (next: any) => (action: any) => {
    const getUser = (): user => {
      // console.log("user state got");
      return storeAPI.getState().user;
    };
    let userState: user;
    switch (action.type) {
      case "chat/joinRoom":
        userState = getUser();
        socket.emit("join-room", {
          room: action.payload.id,
          userName: userState.name,
          userId: userState.id,
        });
        break;
      case "chat/sendMessage":
        // console.log("send msg middle war");
        userState = getUser();
        action.payload.from = { name: userState.name, id: userState.id };
        let msgPayload: msg = action.payload;
        msgPayload.type = "peer";
        // console.log(msgPayload);
        socket.emit("new-msg", action.payload);
        break;
      default:
        break;
    }
    return next(action);
  };
