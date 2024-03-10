import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { weatherActions } from "../../../store/weatherSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const Result: React.FC = () => {
  const { resultCurrent, isCurrent } = useSelector(
    (state: RootState) => state.weather
  );

  const dispatch = useDispatch();

  const activeButtonClass = useMemo(
    () => "bg-blue-500 text-white px-4 rounded-lg",
    []
  );

  return (
    <div>
      <div className="flex items-center gap-4">
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
          onClick={() => {
            dispatch(weatherActions.setIsCurrent(false));
          }}
        >
          Forecast
        </button>
      </div>
      <p>
        Condition: <span>{resultCurrent?.current.condition.text}</span>
      </p>
      <img src={resultCurrent?.current.condition.icon} alt="" />
      <div>
        <p>
          Temperature: <span>{resultCurrent?.current.temp_c}</span> (C)
        </p>
        <button>
          <FontAwesomeIcon icon={faRightLeft} />
        </button>
      </div>

      <p>
        Cloud cover: <span>{resultCurrent?.current.cloud}</span> (%)
      </p>
      <p>
        Humidity: <span>{resultCurrent?.current.humidity}</span> (%)
      </p>
      <p>
        Wind speed: <span>{resultCurrent?.current.wind_kph}</span> (kph)
      </p>
    </div>
  );
};

export default Result;
