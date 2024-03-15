import { createSlice } from "@reduxjs/toolkit";
import { CurrentResponseItf } from "../models/CurrentItf";
import { ForecastResponseItf } from "../models/ForecastInf";
import { LocationItf } from "../models/LocationItf";

interface ResultCurrentItf {
  location: LocationItf;
  current: CurrentResponseItf;
}

interface ResultForecastItf {
  location: LocationItf;
  current: CurrentResponseItf;
  forecast: ForecastResponseItf;
}

interface initialWeatherItf {
  location: string;
  isCurrent: boolean;
  isLoadingCurrent: boolean;
  isLoadingForecast: boolean;
  resultCurrent: ResultCurrentItf | null;
  resultForecast: ResultForecastItf | null;
  forecastDays: number;
}

const initialWeatherState: initialWeatherItf = {
  location: "",
  isCurrent: true,
  isLoadingCurrent: false,
  isLoadingForecast: false,
  resultCurrent: null,
  resultForecast: null,
  forecastDays: 3
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setIsCurrent(state, action) {
      state.isCurrent = action.payload;
    },
    setResultCurrent(state, action) {
      state.resultCurrent = action.payload;
    },
    setResultForecast(state, action) {
      state.resultForecast = action.payload;
    },
    setIsLoadingCurrent(state, action) {
      state.isLoadingCurrent = action.payload;
    },
    setIsLoadingForecast(state, action) {
      state.isLoadingForecast = action.payload;
    },
    setForecastDays(state, action) {
      state.forecastDays = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
