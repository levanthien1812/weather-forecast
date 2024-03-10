import React, { FormEvent, useState } from "react";
import provinces from "../../../data/provinces.json";
import { fetchWeather } from "../../../services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { weatherActions } from "../../../store/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";

const Filter: React.FC = () => {
  const [provinceChosen, setProvinceChosen] = useState<number>(provinces[1].id);
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const dispatch = useDispatch();
  const isCurrent = useSelector((state: RootState) => state.weather.isCurrent);

  const { data, error, isPending } = useQuery({
    queryKey: ["current", { location: provinceChosen }],
    queryFn: ({ signal }) =>
      fetchWeather({
        signal,
        location: provinces.find((province) => province.id === provinceChosen)!
          .name,
        isCurrent: isCurrent,
      }),
    enabled: isEnable,
  });

  if (data) {
    dispatch(weatherActions.setResultCurrent(data));
  }

  const handleFindResult = async (e: FormEvent) => {
    e.preventDefault();
    setIsEnable(true);
  };

  return (
    <form onSubmit={handleFindResult}>
      <label htmlFor="country">Country</label>
      <select name="country" id="country" disabled>
        <option value="1">VietNam</option>
      </select>
      <label htmlFor="province">Province</label>
      <select
        name="province"
        id="province"
        value={provinceChosen}
        onChange={(e) => {
          setProvinceChosen(parseInt(e.target.value));
        }}
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
