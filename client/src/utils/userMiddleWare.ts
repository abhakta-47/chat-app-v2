import { genUUID } from "../utils/crypto/pbkdf2";

export const userMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    // const getUser = (): user => {
    //   // console.log("user state got");
    //   return storeAPI.getState().user;
    // };
    let userState: user;
    switch (action.type) {
      case "user/initUser":
        userState = action.payload;
        const uuid = genUUID();
        userState.id = uuid;
        storeAPI.dispatch({
          type: "user/setUser",
          payload: userState,
        });
        break;
      default:
        return next(action);
    }
  };
