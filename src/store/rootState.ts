import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
