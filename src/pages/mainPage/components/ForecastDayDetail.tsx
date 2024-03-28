import React from "react";
import Modal from "../../../components/Modal";
import { ForecastDay } from "../../../models/ForecastInf";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const ForecastDayDetail: React.FC<{
  open: boolean;
  onClose: () => void;
  forecastDay: ForecastDay;
}> = ({ open, onClose, forecastDay }) => {
  return (
    <Modal
      onClose={onClose}
      open={open}
      allowCloseOnBackdrop={true}
      title={
        "Forecast Day Detail - " +
        format(new Date(forecastDay.date), "dd/MM/yyyy")
      }
    >
      <Line
        data={{
          labels: forecastDay.hour.map((h) =>
            format(new Date(h.time), "hh:mm")
          ),
          datasets: [
            {
              label: "Temperature",
              data: forecastDay.hour.map((h) => h.temp_c),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
        style={{
          height: 200,
        }}
      />
      <Line
        data={{
          labels: forecastDay.hour.map((h) =>
            format(new Date(h.time), "hh:mm")
          ),
          datasets: [
            {
              label: "Wind speed",
              data: forecastDay.hour.map((h) => h.wind_kph),
              fill: false,
              borderColor: "rgb(108, 102, 192)",
              tension: 0.1,
            },
          ],
        }}
        style={{
          marginTop: 20,
          height: 200,
        }}
      />
    </Modal>
  );
};

export default ForecastDayDetail;
