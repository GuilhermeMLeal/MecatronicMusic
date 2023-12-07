import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const ChartComponentPie = ({ data }) => {
  const chartRef = useRef(null);

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  // Cria um conjunto (Set) para armazenar os dias únicos em que houve estudo
  const uniqueStudyDays = new Set(data.map((item) => item.data));

  // Obtém o número de dias estudados e o número de dias não estudados
  const daysStudied = uniqueStudyDays.size;
  const daysNotStudied = daysInMonth - daysStudied;
  
  // Defina cores diferentes para os valores 4 e 9
  const backgroundColors = ["rgba(255, 165, 0 , 0.5)", "rgba(0, 0, 0, 0.7)"];
  const borderColors = ["rgba(255, 165, 0 ,1)", "rgba(0, 0, 0, 1)"];
  const hoverBackgroundColors = [
    "rgba(255, 165, 0 ,0.8)",
    "rgba(0, 0, 0, 0.9)",
  ];
  const hoverBorderColors = ["rgba(255, 165, 0 ,1)", "rgba(0, 0, 0, 1)"];

  const [chartData, setChartData] = useState({
    labels: ["Dias estudados", "Dias não estudados"],
    datasets: [
      {
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: hoverBackgroundColors,
        hoverBorderColor: hoverBorderColors,
        data: [daysStudied, daysNotStudied],
      },
    ],
  });

  useEffect(() => {
    // Configurações do gráfico

    // Criação do gráfico
    const myChart = new Chart(chartRef.current, {
      type: "pie",
      data: chartData,
    });

    // Limpeza ao desmontar o componente
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  useEffect(() => {
    setChartData({
      labels: ["Dias estudados", "Dias não estudados"],
      datasets: [
        {
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          hoverBackgroundColor: hoverBackgroundColors,
          hoverBorderColor: hoverBorderColors,
          data: [daysStudied, daysNotStudied],
        },
      ],
    });
  }, [data]);

  return (
    <div className="bg-gray-100 w-[50%] h-[100%] p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-black">
        Gráfico de dias estudados no mês
      </h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponentPie;
