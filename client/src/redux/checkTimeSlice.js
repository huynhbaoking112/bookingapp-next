import {createSlice} from "@reduxjs/toolkit"

const initialState={
    firstDay:0,
    endDay:0,
    type:""
}

 export const timeSlice=createSlice({
    name:"time",
    initialState,
    reducers:{
        addTime(state,action){
        state.firstDay=action.payload.firstDay
            state.endDay=action.payload.endDay
            state.type=action.payload.type
        }
    }
})

export default timeSlice.reducer
export const {addTime} =timeSlice.actions