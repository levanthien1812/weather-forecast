import { createSlice } from "@reduxjs/toolkit";
import { CurrentResponseItf } from "../models/CurrentItf";
import { ForecastResponseItf } from "../models/ForecastInf";
import { LocationItf } from "../models/LocationItf";

interface resultCurrentItf {
  location: LocationItf;
  current: CurrentResponseItf;
}

interface initialWeatherItf {
  location: string;
  isCurrent: boolean;
  resultCurrent: resultCurrentItf | null;
  resultForecast: ForecastResponseItf | null;
}

const initialWeatherState: initialWeatherItf = {
  location: "",
  isCurrent: true,
  resultCurrent: null,
  resultForecast: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    setIsCurrent(state, action) {
      state.isCurrent = action.payload;
    },
    setResultCurrent(state, action) {
      state.resultCurrent = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
