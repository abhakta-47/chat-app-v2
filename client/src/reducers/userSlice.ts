import { createSlice } from "@reduxjs/toolkit";

const initialState: user = {
  name: "no-init",
  id: "no-init",
  publicKey: "no-init",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, action) => {
      state = action.payload.user;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { initUser, setName } = userSlice.actions;
export default userSlice.reducer;
