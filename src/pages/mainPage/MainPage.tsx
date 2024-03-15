import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Result from "./components/Result";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const MainPage = () => {
  const [isDarkMode, setIsDardMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("isDark", isDarkMode + "");
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="flex justify-center dark:bg-black">
      <div className="2xl:w-2/5 md:w-3/5 w-4/5 mt-8">
        <Filter />
        <Result />
      </div>
      <div
        className={`absolute right-8 top-8 ${
          isDarkMode ? "bg-blue-600" : "bg-blue-400"
        }  p-3 rounded-full`}
      >
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={() => setIsDardMode(!isDarkMode)}
          size={35}
        />
      </div>
    </div>
  );
};

export default MainPage;
