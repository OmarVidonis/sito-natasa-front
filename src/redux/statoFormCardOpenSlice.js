import { createSlice } from "@reduxjs/toolkit";

export const statoFormCardOpenSlice = createSlice({
    name:"statoFormCardOpen",
    initialState: {
        value: false
    },
    reducers:{
        setStatoFormCardOpen: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const {setStatoFormCardOpen} =statoFormCardOpenSlice.actions
export const statoFormCardOpenReducer = statoFormCardOpenSlice.reducer