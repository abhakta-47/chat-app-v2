import { genaerateKeyPair } from "../utils/crypto/rsa";

export const userMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    const getUser = (): user => {
      // console.log("user state got");
      return storeAPI.getState().user;
    };
    let userState: user;
    switch (action.type) {
      case "user/initUser":
        userState = action.payload;
        genaerateKeyPair().then((keypair) => {
          userState.keypair = keypair;
          storeAPI.dispatch({
            type: "user/setUser",
            payload: userState,
          });
        });
        break;
      default:
        return next(action);
    }
  };
