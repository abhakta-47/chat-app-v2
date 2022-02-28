import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        // console.log(action.payload);
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
      return action.payload;
    },
  },
});

// console.log("userSlice", userSlice);
export const { initUser, setName } = userSlice.actions;
export default userSlice.reducer;
