import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { weatherActions } from "../../../store/weatherSlice";
import CurrentResult from "./CurrentResult";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../../services/weatherService";
import ForecastResult from "./ForecastResult";

const Result: React.FC = () => {
  const { resultCurrent, resultForecast, isCurrent, isLoading, location } =
    useSelector((state: RootState) => state.weather);

  const dispatch = useDispatch();

  const activeButtonClass = useMemo(
    () => "bg-blue-500 text-white px-4 rounded-lg",
    []
  );

  const { data, error, refetch } = useQuery({
    queryKey: ["forecast", { location: location }],
    queryFn: ({ signal }) =>
      fetchWeather({
        signal,
        location: location,
        isCurrent: !isCurrent,
      }),
    enabled: false,
  });

  const handleForecastClick = () => {
    dispatch(weatherActions.setIsCurrent(false));
    if (location.length > 0) {
      refetch();
    }
  };

  if (data) {
    dispatch(weatherActions.setResultForecast(data));
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          className={isCurrent ? activeButtonClass : ""}
          onClick={() => {
            dispatch(weatherActions.setIsCurrent(true));
          }}
        >
          Current
        </button>
        <button
          className={!isCurrent ? activeButtonClass : ""}
          onClick={handleForecastClick}
        >
          Forecast
        </button>
      </div>
      {isLoading && <p>Loading ...</p>}
      <div>
        <div>
          <p className="mb-2">Location: {location}</p>{" "}
        </div>
        {resultCurrent && isCurrent && (
          <CurrentResult current={resultCurrent.current} />
        )}
        {resultForecast && !isCurrent && (
          <ForecastResult forecast={resultForecast.forecast} />
        )}
      </div>
    </div>
  );
};

export default Result;
