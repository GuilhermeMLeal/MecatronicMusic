// components/Card.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ title, colorClass, widthClass, heightClass }) => {
  // Estados locais para armazenar os valores de tempo
  const [dailyTime, setDailyTime] = useState(0);
  const [weeklyTime, setWeeklyTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua a URL abaixo pela sua API
        const response = await axios.get("http://10.109.25.74:8000/espinfo/");
        const data = response.data;

        // Aqui você deve ajustar a estrutura dos dados conforme a resposta da sua API
        const dailyTimeValue = data.totalHorasDia || 0;
        const weeklyTimeValue = data.totalHorasSemana || 0;

        setDailyTime(dailyTimeValue);
        setWeeklyTime(weeklyTimeValue);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // A dependência vazia faz com que este efeito só seja executado uma vez, ao montar o componente

  // Função auxiliar para formatar o valor de tempo
  const formatTime = (hours) => {
    if (hours === 1) {
      return `${hours} hora`;
    } else {
      return `${hours} horas`;
    }
  };

  const formattedDailyTime = formatTime(dailyTime);
  const formattedWeeklyTime = formatTime(weeklyTime);
  const cardClasses = `${colorClass} ${widthClass} ${heightClass}  p-4 rounded-md shadow-md`;

  return (
    <div className={cardClasses}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">Total no dia: {formattedDailyTime}</p>
      <p className="text-3xl font-bold">Total na semana: {formattedWeeklyTime}</p>
    </div>
  );
};

export default Card;
