import { createSlice } from "@reduxjs/toolkit";
 
const qstnDifficultySlice = createSlice({
    name: "question difficulty slice",
    initialState:"choose",
    reducers:{
        changedifficultyvalue:(state,action)=>{            
            return action.payload
        }
    }
})

export const {changedifficultyvalue} = qstnDifficultySlice.actions;
export default qstnDifficultySlice.reducer;
