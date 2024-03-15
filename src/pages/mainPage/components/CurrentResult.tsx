import React, { useState } from "react";
import { CurrentResponseItf } from "../../../models/CurrentItf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const CurrentResult: React.FC<{ current: CurrentResponseItf }> = (props) => {
  const [temperatureMeasurement, setTemperatureMeasurement] = useState<
    "C" | "F"
  >("C");
  const [windSpeedMeasurement, setWindSpeedMeasurement] = useState<
    "kph" | "mph"
  >("kph");

  return (
    <div className="border border-blue-600 px-6 py-4 rounded-xl space-y-2 dark:bg-gray-700">
      <p className="dark:text-white">
        Condition:{" "}
        <span className="bg-blue-200 dark:text-black rounded-md px-2">
          {props?.current.condition.text}
        </span>
      </p>
      <div>
        <img src={props?.current.condition.icon} alt="" />
      </div>
      <div className="flex items-center gap-2">
        <p className="dark:text-white">
          Temperature:{" "}
          <span className="bg-blue-200 dark:text-black rounded-md px-2">
            {temperatureMeasurement === "C"
              ? props?.current.temp_c + " C"
              : props?.current.temp_f + " F"}
          </span>
        </p>
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

      <p className="dark:text-white">
        Cloud cover:{" "}
        <span className="bg-blue-200 dark:text-black rounded-md px-2">
          {props?.current.cloud + " %"}
        </span>
      </p>
      <p className="dark:text-white">
        Humidity:{" "}
        <span className="bg-blue-200 dark:text-black rounded-md px-2">
          {props?.current.humidity + " %"}
        </span>
      </p>
      <div className="flex items-center gap-2">
        <p className="dark:text-white">
          Wind speed:{" "}
          <span className="bg-blue-200 dark:text-black rounded-md px-2">
            {windSpeedMeasurement === "kph"
              ? props?.current.wind_kph + " kph"
              : props?.current.wind_mph + " mph"}
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
    </div>
  );
};

export default CurrentResult;
