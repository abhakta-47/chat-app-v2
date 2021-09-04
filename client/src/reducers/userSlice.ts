import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: user = {
  name: "no-init",
  id: "no-init",
  publicKey: "no-init",
};

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
            id: "kkkkkkkId",
            publicKey: "strogestKey",
          },
        };
      },
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

console.log("userSlice", userSlice);
export const { initUser, setName } = userSlice.actions;
export default userSlice.reducer;
