import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.isLoggedIn = true;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const {
  setUserInfo,
  setUserId,
  setEmail,
  setFirstName,
  setLastName,
  setAddress,
  setIsLoggedIn,
} = userSlice.actions;
export default userSlice.reducer;
