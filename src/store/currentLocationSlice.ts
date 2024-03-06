import { createSlice } from "@reduxjs/toolkit";

interface LocationSlice {
  longitude: number | null;
  latitude: number | null;
}

const initialState: LocationSlice = {
  longitude: null,
  latitude: null,
};

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState,
  reducers: {
    setLocation: (state, action: { payload: LocationSlice }) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
    removeLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setLocation, removeLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
