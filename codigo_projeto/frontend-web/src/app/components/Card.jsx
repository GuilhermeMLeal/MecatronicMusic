import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ title, colorClass, widthClass, heightClass }) => {
  const [dailyTime, setDailyTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.101:8000/espinfo/");
        const data = response.data;

        const dataMap = {};
        data.forEach((item) => {
          const date = item.data;
          dataMap[date] = (dataMap[date] || 0) + parseFloat(item.tempo_de_estudo);
        });

        const dataAtual = new Date();
        const dataAtualFormatada = dataAtual.toISOString().split('T')[0];

        // Obtém a última data no formato 'YYYY-MM-DD'
        const ultimaData = Object.keys(dataMap).pop();

        // Verifica se a última data é igual à data atual
        const isMesmoDia = ultimaData === dataAtualFormatada;

        // Obtém o valor correspondente à última data
        const valorUltimaData = isMesmoDia ? dataMap[ultimaData] : 0;

        // Atualiza o estado com os novos dados
        setDailyTime(valorUltimaData);

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

  const cardClasses = `${colorClass} ${widthClass} ${heightClass} p-4 rounded-md shadow-md text-center`;

  return (
    <div className={cardClasses}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">Horas estudadas no dia atual: {formatTime(dailyTime)}</p>
    </div>
  );
};

export default Card;
