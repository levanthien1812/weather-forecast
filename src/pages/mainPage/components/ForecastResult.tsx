import React, { ChangeEvent, useEffect, useState } from "react";
import { ForecastResponseItf } from "../../../models/ForecastInf";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { UseQueryResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { weatherActions } from "../../../store/weatherSlice";
import ForecastItem from "./ForecastItem";

const ForecastResult: React.FC<{
  forecast: ForecastResponseItf;
}> = (props) => {
  const { forecastDays, isLoadingForecast } = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch();

  const handleDaysClick = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(weatherActions.setForecastDays(parseInt(e.target.value)));
  };

  return (
    <div className="border border-blue-600 px-6 py-4 rounded-xl space-y-2 dark:bg-white">
      <div>
        <label htmlFor="days">Select forecast days: </label>
        <select
          name="days"
          id="days"
          className="border border-blue-500 rounded-md outline-none"
          onChange={handleDaysClick}
          value={forecastDays}
        >
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
        </select>
      </div>
      {props.forecast && !isLoadingForecast && (
        <div className="flex gap-3 overflow-x-scroll">
          {props.forecast.forecastday.map((day) => (
            <ForecastItem day={day} key={day.date} />
          ))}
        </div>
      )}
      {isLoadingForecast && <p>Loading...</p>}
    </div>
  );
};

export default ForecastResult;
