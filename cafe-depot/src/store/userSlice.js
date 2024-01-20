import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  address: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.isLoggedIn = true;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logoutUser: (state) => {
      state.username = "";
      state.password = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const {
  setUserInfo,
  setUsername,
  setPassword,
  setEmail,
  setAddress,
  setIsLoggedIn,
  logoutUser
} = userSlice.actions;
export default userSlice.reducer;