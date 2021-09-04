export const socketInit =
  (socket: any) => (storeAPI: any) => (next: any) => (action: any) => {
    // console.log("socket-mid-ware", socket);
    // console.log("action", action);
    // console.log("storeapi", storeAPI);
    // if (action.type === "chat/joinRoom")
    // socket.emit("join-room", { room: action.payload.id });
    switch (action.type) {
      case "chat/joinRoom":
        socket.emit("join-room", { room: action.payload.id });
        break;
      case "chat/sendMessage":
        const user = storeAPI.getState().user;
        action.payload.from = { name: user.name, id: user.id };
        socket.emit("new-msg", action.payload);
        break;
      default:
        break;
    }
    return next(action);
  };
