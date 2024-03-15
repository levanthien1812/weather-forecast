import React, { FormEvent, useEffect, useMemo, useState } from "react";
import provinces from "../../../data/provinces.json";
import { fetchWeather } from "../../../services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { weatherActions } from "../../../store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";

const Filter: React.FC = () => {
  const [provinceChosen, setProvinceChosen] = useState<number>(provinces[1].id);

  const dispatch = useDispatch();
  const { isCurrent, location, forecastDays } = useSelector(
    (state: RootState) => state.weather
  );

  const activeButtonClass = useMemo(
    () => "bg-blue-500 text-white px-4 rounded-lg",
    []
  );

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      isCurrent ? "current" : "forecast",
      {
        location: provinces.find((province) => province.id === provinceChosen)
          ?.name,
        days: isCurrent ? 1 : forecastDays,
      },
    ],
    queryFn: ({ signal }) =>
      fetchWeather({
        signal: signal,
        location: provinces.find((province) => province.id === provinceChosen)!
          .name,
        isCurrent: isCurrent,
        days: forecastDays,
      }),
    enabled: false,
  });

  if (data) {
    if (isCurrent) {
      dispatch(weatherActions.setResultCurrent(data));
      dispatch(weatherActions.setIsLoadingCurrent(false));
    } else {
      dispatch(weatherActions.setResultForecast(data));
      dispatch(weatherActions.setIsLoadingForecast(false));
    }
  }

  if (isLoading) {
    dispatch(
      isCurrent
        ? weatherActions.setIsLoadingCurrent(true)
        : weatherActions.setIsLoadingForecast(true)
    );
  }

  const handleFindResult = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      weatherActions.setLocation(
        provinces.find((province) => province.id === provinceChosen)?.name
      )
    );
  };

  useEffect(() => {
    refetch();
  }, [isCurrent, location, forecastDays]);

  return (
    <form onSubmit={handleFindResult} className="mb-4">
      <div className=" flex items-center gap-4 mb-4">
        <div>
          <label htmlFor="country" className="me-2 dark:text-white">
            Country
          </label>
          <select
            name="country"
            id="country"
            disabled
            className="border border-blue-500 rounded-md outline-none"
          >
            <option value="1">VietNam</option>
          </select>
        </div>
        <div>
          <label htmlFor="province" className="me-2 dark:text-white">
            Province
          </label>
          <select
            name="province"
            id="province"
            value={provinceChosen}
            onChange={(e) => {
              setProvinceChosen(parseInt(e.target.value));
            }}
            className="border border-blue-500 rounded-md outline-none"
          >
            {provinces.map((province) => (
              <option
                key={province.id}
                id={province.id.toString()}
                value={province.id}
              >
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 rounded-md text-white hover:bg-blue-600"
        >
          Find result
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          className={"dark:text-white " + isCurrent ? activeButtonClass : ""}
          onClick={() => {
            dispatch(weatherActions.setIsCurrent(true));
          }}
        >
          Current
        </button>
        <button
          className={"dark:text-white " + !isCurrent ? activeButtonClass : ""}
          onClick={() => {
            dispatch(weatherActions.setIsCurrent(false));
          }}
        >
          Forecast
        </button>
      </div>
    </form>
  );
};

export default Filter;
