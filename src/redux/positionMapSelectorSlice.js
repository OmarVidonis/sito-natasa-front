import { createSlice } from "@reduxjs/toolkit";

export const positionMapSelectorSlice = createSlice({
    name:"positionMapSelector",
    initialState: {
        value:{
            lng:0,
            lat:0,
        }
    },
    reducers:{
        replacePositionMapSelector: (state, action) => {
            state.value=(action.payload);
        },
    },
})

export const {replacePositionMapSelector} =positionMapSelectorSlice.actions
export const positionMapSelectorReducer = positionMapSelectorSlice.reducer