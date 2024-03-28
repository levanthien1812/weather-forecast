import React, { useState } from "react";
import { ForecastDay } from "../../../models/ForecastInf";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../../components/Modal";
import ForecastDayDetail from "./ForecastDayDetail";

const ForecastItem: React.FC<{ day: ForecastDay }> = ({ day }) => {
  const [temperatureMeasurement, setTemperatureMeasurement] = useState<
    "C" | "F"
  >("C");
  const [windSpeedMeasurement, setWindSpeedMeasurement] = useState<
    "kph" | "mph"
  >("kph");

  const [isViewingDetail, setIsViewingDetail] = useState<boolean>(false);

  // const handleViewDetail = () => {
  //   setIsViewingDetail(true)
  // }

  return (
    <div
      key={day.date}
      className="px-2 pt-4 pb-2 rounded-md bg-blue-300 w-1/3 shrink-0 hover:bg-blue-400 cursor-pointer"
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

      <div className="mt-4">
        <button
          className="bg-gray-100 text-center w-full py-1 rounded-md hover:bg-white"
          onClick={() => {
            setIsViewingDetail(true);
          }}
        >
          View detail
        </button>
      </div>
      {isViewingDetail && (
        <ForecastDayDetail
          open={isViewingDetail}
          onClose={() => {
            setIsViewingDetail(false);
          }}
          forecastDay={day}
        />
      )}
    </div>
  );
};

export default ForecastItem;
