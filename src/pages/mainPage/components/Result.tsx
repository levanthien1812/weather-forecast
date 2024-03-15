import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { weatherActions } from "../../../store/weatherSlice";
import CurrentResult from "./CurrentResult";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../../services/weatherService";
import ForecastResult from "./ForecastResult";

const Result: React.FC = () => {
  const {
    resultCurrent,
    resultForecast,
    isCurrent,
    isLoadingCurrent,
    location,
    forecastDays,
  } = useSelector((state: RootState) => state.weather);

  return (
    <div>
      {isLoadingCurrent && <p>Loading ...</p>}
      <div>
        <div>
          <p className="mb-2">Location: {location}</p>{" "}
        </div>
        {resultCurrent && isCurrent && (
          <CurrentResult current={resultCurrent.current} />
        )}
        {resultForecast && !isCurrent && (
          <ForecastResult
            forecast={resultForecast.forecast}
          />
        )}
      </div>
    </div>
  );
};

export default Result;
