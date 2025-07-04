import { configureStore } from "@reduxjs/toolkit";
import qstnDifficultySlice from "./difficultyoptionReducer"
import skippedquestionSlice from "./SkippedQuestionsreducer"
import timeOutCheckSlice from "./TimeOutReducer"
import TimeToStyleWhenTimeEnds from "./TimeNowStyleReducer";


const store = configureStore({
    reducer:{
        difficultyValueOfQuestion: qstnDifficultySlice,
        Skippedquestions : skippedquestionSlice,
        checktimefinishedornot: timeOutCheckSlice,
        currenttimeusedtostyle: TimeToStyleWhenTimeEnds,
        
    }

})


export default store;