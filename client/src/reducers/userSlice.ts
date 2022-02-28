import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { genaerateKeyPair } from "../utils/crypto/rsa";

const initUserObj = (): user => {
  let emptyUser: user = {
    name: "no-init",
    id: "no-init",
    publicKey: "no-init",
  };
  return emptyUser;
};

const initialState: user = initUserObj();
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: {
      reducer: (state, action: PayloadAction<user>) => {
        console.log(action.payload);
        // state = { ...action.payload };
        return { ...action.payload };
      },
      prepare: (userName) => {
        return {
          payload: {
            name: userName,
          },
        };
      },
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

// console.log("userSlice", userSlice);
export const { initUser, setName } = userSlice.actions;
export default userSlice.reducer;
