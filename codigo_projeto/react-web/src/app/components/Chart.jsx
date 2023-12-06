import React, { useCallback, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Horas estudadas",
        backgroundColor: "rgba(255, 165, 0 , 0.5)",
        borderColor: "rgba(255, 165, 0 ,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 165, 0 ,0.8)",
        hoverBorderColor: "rgba(255, 165, 0 ,1)",
      },
    ],
  });

  useEffect(() => {
    // Configurações do gráfico
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Criação do gráfico
    const myChart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options,
    });

    // Limpeza ao desmontar o componente
    return () => {
      myChart.destroy();
    };
  }, [chartData]);


  useEffect(() => {
    const dataMap = {};
    data.forEach((item) => {
      const date = item.data;
      if (!dataMap[date]) {
        dataMap[date] = 0;
      }
      dataMap[date] += parseFloat(item.tempo_de_estudo); // Converte para float se necessário
    });

    // Converte o objeto para arrays de labels e data
    const labels = Object.keys(dataMap);
    const studies = Object.values(dataMap);

    // Atualiza o estado com os novos dados
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels,
      datasets: [
        {
          ...prevChartData.datasets[0],
          data: studies,
        },
      ],
    }));
  }, [data]);

  return (
    <div className="bg-gray-100 w-[50%] h-[30%] p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-black">
        Gráfico de Horas estudadas por dia
      </h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
