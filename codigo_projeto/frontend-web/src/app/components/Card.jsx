import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ title, colorClass, widthClass, heightClass }) => {
  const [dailyTime, setDailyTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://squad05.pythonanywhere.com/espinfo/"
        );
        const data = response.data;

        const dataMap = {};
        data.forEach((item) => {
          const date = item.data;
          dataMap[date] =
            (dataMap[date] || 0) + parseFloat(item.tempo_de_estudo);
        });

        const dataAtual = new Date();
        const dataAtualFormatada = dataAtual.toISOString().split("T")[0];

        const ultimaData = Object.keys(dataMap).pop();
        const isMesmoDia = ultimaData === dataAtualFormatada;

        const valorUltimaData = isMesmoDia ? dataMap[ultimaData] : 0;

        setDailyTime(valorUltimaData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Função para converter segundos para o formato hh:mm:ss
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const cardClasses = `${colorClass} ${widthClass} ${heightClass} p-4 rounded-md shadow-md text-center`;

  return (
    <div className={cardClasses}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">
        Tempo estudado no dia atual: {formatTime(dailyTime)}
      </p>
    </div>
  );
};

export default Card;
