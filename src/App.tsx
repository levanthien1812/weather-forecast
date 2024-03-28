import React from "react";
import MainPage from "./pages/mainPage/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

function App() {
  const queryClient = new QueryClient();

  Chart.register(
    PointElement,
    LineElement,
    LineController,
    CategoryScale,
    LinearScale
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
