import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ title, colorClass, widthClass, heightClass }) => {
  const [dailyTime, setDailyTime] = useState(0);
  const [weeklyTime, setWeeklyTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.101:8000/espinfo/");
        const data = response.data;

        // Ajuste conforme a estrutura real dos dados
        const dailyTimeValue = data.tempo_de_estudo || 0; // Supondo que haja uma distinção entre diário e semanal
        const weeklyTimeValue = data.tempo_de_estudo || 0;

        setDailyTime(formatTime(dailyTimeValue));
        setWeeklyTime(formatTime(weeklyTimeValue));

        console.log(setDailyTime)
      } catch (error) {
        console.error(error);
        // Considerar adicionar um estado para exibir uma mensagem de erro.
      }
    };

    fetchData();
  }, []);

  const formatTime = (hours) => {
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  };

  const cardClasses = `${colorClass} ${widthClass} ${heightClass} p-4 rounded-md shadow-md`;

  return (
    <div className={cardClasses}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">Total no dia: {dailyTime}</p>
      <p className="text-3xl font-bold">Total na semana: {weeklyTime}</p>
    </div>
  );
};

export default Card;
