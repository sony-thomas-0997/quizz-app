import { createSlice } from "@reduxjs/toolkit";

const TimeToStyleWhenTimeEnds = createSlice({
    name: "Used to style question display page when time ends",
    initialState: {
        current_minute: 3,
        current_second: 0,
    },
    reducers: {
        updatecurrenttimestyle: (state, action) => {
           
            return ({
                current_minute: action.payload.currentminute,
                current_second: action.payload.currentsecond
            })
        }
    }

});
export const { updatecurrenttimestyle } = TimeToStyleWhenTimeEnds.actions

export default TimeToStyleWhenTimeEnds.reducer