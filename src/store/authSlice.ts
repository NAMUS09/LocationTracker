import { createSlice } from "@reduxjs/toolkit";
import { UserDataCookie } from "../hooks/useUserCookie";

interface InitialState {
  status: boolean;
  userData: UserDataCookie | null;
}

const initialState: InitialState = {
  status: false,
  userData: {} as UserDataCookie,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
