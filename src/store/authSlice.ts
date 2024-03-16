import { createSlice } from "@reduxjs/toolkit";
import { UserDataCookie } from "../hooks/useUserCookie";
import { LoginResponse } from "../constants/interfaces/authResponse";

interface InitialState {
  status: boolean;
  userData: UserDataCookie | LoginResponse | null;
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
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem("User");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
