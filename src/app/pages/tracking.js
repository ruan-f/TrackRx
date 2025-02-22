import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS } from "chart.js";

ChartJS.register(ArcElement);

const DAYS_IN_CYCLE = 30; // Adjustable cycle length

const generateTrackingData = (currentDay) => {
  return Array.from({ length: DAYS_IN_CYCLE }, (_, i) => ({
    day: i + 1,
    isToday: i + 1 === currentDay,
    isHighlighted: i + 1 === (currentDay + 26) % DAYS_IN_CYCLE,
  }));
};

const Tracking = () => {
  const [currentDay, setCurrentDay] = useState(new Date().getDate() % DAYS_IN_CYCLE);
  const [trackingData, setTrackingData] = useState(generateTrackingData(currentDay));

  useEffect(() => {
    setTrackingData(generateTrackingData(currentDay));
  }, [currentDay]);

  const data = {
    labels: trackingData.map((d) => d.day.toString()),
    datasets: [
      {
        data: Array(DAYS_IN_CYCLE).fill(1),
        backgroundColor: trackingData.map((d) =>
          d.isToday ? "#00ff00" : d.isHighlighted ? "#ff1493" : "#ffcccb"
        ),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Tracking - Day {currentDay} of the cycle</h2>
      <div className="w-72 h-72 relative">
        <Pie data={data} options={{ responsive: true, cutout: "80%" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-gray-800 px-4 py-2 rounded-full text-white mt-2"
            onClick={() => setCurrentDay((currentDay + 1) % DAYS_IN_CYCLE)}
          >
            Next Day
          </button>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 rounded"
        onClick={() => setCurrentDay(new Date().getDate() % DAYS_IN_CYCLE)}
      >
        Back to Today
      </button>
    </div>
  );
};

export default Tracking;
