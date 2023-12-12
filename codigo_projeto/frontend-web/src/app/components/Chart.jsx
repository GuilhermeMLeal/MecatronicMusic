import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "tempo de estudado",
        backgroundColor: "rgba(255, 165, 0 , 0.5)",
        borderColor: "rgba(255, 165, 0 ,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 165, 0 ,0.8)",
        hoverBorderColor: "rgba(255, 165, 0 ,1)",
      },
    ],
  });

  // Função para converter segundos para o formato hh:mm:ss
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Formata para hh:mm:ss
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://squad05.pythonanywhere.com/espinfo/");
      const data = response.data;

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Configurações do gráfico
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              return formatTime(value);
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || "";
              const value = context.parsed.y || 0;
              return `${label}: ${formatTime(value)}`;
            },
          },
        },
      },
    };

    // Criação do gráfico
    const myChart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options,
    });

    // Define o temporizador para buscar dados a cada 5 minutos (300000 milissegundos)
    const fetchDataTimer = setInterval(fetchData, 300000);

    // Limpeza ao desmontar o componente
    return () => {
      myChart.destroy();
      clearInterval(fetchDataTimer);
    };
  }, [chartData]);

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 w-full md:w-[50%] h-[60%] md:h-full p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-black">
        Gráfico de tempo de estudado por dia
      </h2>
      <div className="w-full md:h-[80%]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
