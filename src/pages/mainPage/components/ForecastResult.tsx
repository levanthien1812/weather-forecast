import React, { ChangeEvent, useEffect, useState } from "react";
import { ForecastResponseItf } from "../../../models/ForecastInf";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../../../store/weatherSlice";
import { RootState } from "../../../store/rootState";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../../services/weatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const ForecastResult: React.FC<{ forecast: ForecastResponseItf }> = (props) => {
  //   const dispatch = useDispatch();
  const [forecastDays, setForecastDays] = useState<number>(3);
  const [temperatureMeasurement, setTemperatureMeasurement] = useState<
    "C" | "F"
  >("C");
  const [windSpeedMeasurement, setWindSpeedMeasurement] = useState<
    "kph" | "mph"
  >("kph");
  const { location, resultForecast } = useSelector(
    (state: RootState) => state.weather
  );
  const dispatch = useDispatch();

  const { data, error, refetch } = useQuery({
    queryKey: ["forecast", { location: location }],
    queryFn: ({ signal }) =>
      fetchWeather({
        signal,
        location: location,
        isCurrent: false,
        days: forecastDays,
      }),
    enabled: false,
    staleTime: 7000,
  });

  if (data) {
    dispatch(weatherActions.setResultForecast(data));
  }

  const handleDaysClick = (e: ChangeEvent<HTMLSelectElement>) => {
    setForecastDays(parseInt(e.target.value));
  };

  useEffect(() => {
    refetch();
  }, [forecastDays]);

  return (
    <div className="border border-blue-600 px-6 py-4 rounded-xl space-y-2">
      <div>
        <label htmlFor="days">Select forecast days: </label>
        <select
          name="days"
          id="days"
          className="border border-blue-500 rounded-md outline-none"
          onChange={handleDaysClick}
        >
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
        </select>
      </div>
      {props.forecast && (
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
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-sm">
                    Minimum temperature:{" "}
                    <span className="bg-blue-200 rounded-md px-2 text-lg">
                      {temperatureMeasurement === "C"
                        ? day.day.mintemp_c + " C"
                        : day.day.mintemp_f + " F"}
                    </span>
                  </p>
                  <p className="text-sm">
                    Maximum temperature:{" "}
                    <span className="bg-blue-200 rounded-md px-2 text-lg">
                      {temperatureMeasurement === "C"
                        ? day.day.maxtemp_c + " C"
                        : day.day.maxtemp_f + " F"}
                    </span>
                  </p>
                  <p className="text-sm">
                    Average temperature:{" "}
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
                  Maximum wind speed:{" "}
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
                Average humidity:{" "}
                <span className="bg-blue-200 rounded-md px-2 text-lg">
                  {day.day.avghumidity + " %"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastResult;
