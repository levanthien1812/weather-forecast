import React, { FormEvent, useState } from "react";
import provinces from "../../../data/provinces.json";
import { fetchWeather } from "../../../services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { weatherActions } from "../../../store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";

const Filter: React.FC = () => {
  const [provinceChosen, setProvinceChosen] = useState<number>(provinces[1].id);

  const dispatch = useDispatch();
  const { isCurrent, location } = useSelector(
    (state: RootState) => state.weather
  );

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "current",
      {
        location: provinces.find((province) => province.id === provinceChosen)
          ?.name,
      },
    ],
    queryFn: ({ signal }) =>
      fetchWeather({
        signal,
        location: provinces.find((province) => province.id === provinceChosen)!
          .name,
        isCurrent: isCurrent,
      }),
    enabled: false,
  });

  if (data) {
    dispatch(weatherActions.setResultCurrent(data));
    dispatch(weatherActions.setIsLoading(false));
  }

  if (isLoading) {
    dispatch(weatherActions.setIsLoading(true));
  }

  const handleFindResult = async (e: FormEvent) => {
    e.preventDefault();
    refetch();
    dispatch(
      weatherActions.setLocation(
        provinces.find((province) => province.id === provinceChosen)?.name
      )
    );
  };

  return (
    <form onSubmit={handleFindResult} className="mb-4 flex items-center gap-4">
      <div>
        <label htmlFor="country" className="me-2">
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
        <label htmlFor="province" className="me-2">
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
    </form>
  );
};

export default Filter;
