import { createSlice } from "@reduxjs/toolkit";

let timeOutCheckSlice = createSlice({
  name: "To Check time finished",
  initialState: false,
  reducers: {
    timeFinishedBooleanToTrue: (state) => {
      return true;
    },
    timeFinishedBooleanToFalse: (state) => {
      return false;
    },
  },
});

export const { timeFinishedBooleanToTrue, timeFinishedBooleanToFalse } =
  timeOutCheckSlice.actions;

export default timeOutCheckSlice.reducer;
