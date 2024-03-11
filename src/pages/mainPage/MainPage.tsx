import React from "react";
import Filter from "./components/Filter";
import Result from "./components/Result";

const MainPage = () => {
  return (
    <div className="flex justify-center">
      <div className="2xl:w-2/5 md:w-3/5 w-4/5 mt-8">
        <Filter />
        <Result />
      </div>
    </div>
  );
};

export default MainPage;
