import { configureStore } from "@reduxjs/toolkit";
import { citiesReducer } from "./citiesSlice";
import { positionMapSelectorReducer } from "./positionMapSelectorSlice";
import { statoFormCardOpenReducer } from "./statoFormCardOpenSlice";

export default configureStore({
    reducer:{
        cities : citiesReducer,
        positionMapSelector : positionMapSelectorReducer,
        statoFormCardOpen : statoFormCardOpenReducer,
    },
})