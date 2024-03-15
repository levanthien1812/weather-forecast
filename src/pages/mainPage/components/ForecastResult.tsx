import React, { ChangeEvent, useEffect, useState } from "react";
import { ForecastResponseItf } from "../../../models/ForecastInf";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { UseQueryResult } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { weatherActions } from "../../../store/weatherSlice";

const ForecastResult: React.FC<{
  forecast: ForecastResponseItf;
}> = (props) => {
  const { forecastDays, isLoadingForecast } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();
  const [temperatureMeasurement, setTemperatureMeasurement] = useState<
    "C" | "F"
  >("C");
  const [windSpeedMeasurement, setWindSpeedMeasurement] = useState<
    "kph" | "mph"
    >("kph");
  
  const handleDaysClick = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(weatherActions.setForecastDays(parseInt(e.target.value)));
  };

  return (
    <div className="border border-blue-600 px-6 py-4 rounded-xl space-y-2">
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
            <div
              key={day.date}
              className="px-2 py-4 rounded-md bg-blue-300 w-1/3 shrink-0 hover:bg-blue-400 cursor-pointer"
            >
              <p>{day.date}</p>
              <p>
                Condition:{" "}
                <span className="bg-blue-200 rounded-md px-2">
                  {day.day.condition.text}
                </span>
              </p>
              <div>
                <img src={day.day.condition.icon} alt="" />
              </div>
              <div className="flex items-start gap-2 justify-between">
                <div>
                  <p className="text-sm">
                    Minimum temperature: <br />
                    <span className="bg-blue-200 rounded-md px-2 text-lg">
                      {temperatureMeasurement === "C"
                        ? day.day.mintemp_c + " C"
                        : day.day.mintemp_f + " F"}
                    </span>
                  </p>
                  <p className="text-sm">
                    Maximum temperature: <br />
                    <span className="bg-blue-200 rounded-md px-2 text-lg">
                      {temperatureMeasurement === "C"
                        ? day.day.maxtemp_c + " C"
                        : day.day.maxtemp_f + " F"}
                    </span>
                  </p>
                  <p className="text-sm">
                    Average temperature: <br />
                    <span className="bg-blue-200 rounded-md px-2 text-lg">
                      {temperatureMeasurement === "C"
                        ? day.day.avgtemp_c + " C"
                        : day.day.avgtemp_f + " F"}
                    </span>
                  </p>
                </div>

                <button
                  className="flex justify-center items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={() =>
                    setTemperatureMeasurement(
                      temperatureMeasurement === "C" ? "F" : "C"
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faRightLeft}
                    className="text-blue-500 text-sm"
                  />
                </button>
              </div>
              <div className="flex items-start gap-2">
                <p className="text-sm">
                  Maximum wind speed: <br />
                  <span className="bg-blue-200 rounded-md px-2 text-lg">
                    {windSpeedMeasurement === "kph"
                      ? day.day.maxwind_kph + " kph"
                      : day.day.maxwind_mph + " mph"}
                  </span>
                </p>
                <button
                  className="flex justify-center items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={() =>
                    setWindSpeedMeasurement(
                      windSpeedMeasurement === "kph" ? "mph" : "kph"
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faRightLeft}
                    className="text-blue-500 text-sm"
                  />
                </button>
              </div>
              <p className="text-sm">
                Average humidity: <br />
                <span className="bg-blue-200 rounded-md px-2 text-lg">
                  {day.day.avghumidity + " %"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      {isLoadingForecast && <p>Loading...</p>}
    </div>
  );
};

export default ForecastResult;
