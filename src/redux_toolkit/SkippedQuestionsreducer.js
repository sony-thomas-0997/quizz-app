import { createSlice } from "@reduxjs/toolkit";

const skippedQuestionSlice = createSlice({
  name: "Questions skipped by user as array",
  initialState: [],
  reducers: {
    addNewQstnToSkippedArray: (state, action) => {
      state.push(...action.payload);
    },
    removeQstnFromSkippedArray: (state, action) => {
      state.splice(action.payload.indexOfQstnToRemove, 1);
    },
    emptyskippedqstns:()=>{
      return []
    }
  },
});
export const { addNewQstnToSkippedArray, removeQstnFromSkippedArray,emptyskippedqstns } =
  skippedQuestionSlice.actions;
export default skippedQuestionSlice.reducer;
