"use client";
import React, { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import Chart from "./components/Chart"; // Certifique-se de que o caminho e o nome do arquivo estão corretos
import ChartComponentPie from "./components/ChartPie";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("https://squad05.pythonanywhere.com/espinfo/");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="rounded bg-white min-h-screen w-full p-4 md:p-8">
      <header className="flex h-1/6 md:h-1/8 items-center ml-4 md:ml-10 text-black text-xl md:text-3xl mb-5 ">
        <img src="./ADSMEC_logo.png" className="h-8 w-8 md:h-12 md:w-12" alt="Logo" />
        <div className="text-yellow-400 ml-2 md:ml-4">Dashboards</div>
      </header>

      <div className="flex flex-col md:flex-row bg-gray-200 h-[80%] p-4 md:p-10 rounded gap-10 justify-around">
        <Chart
          data={data}
          className="bg-purple-500 text-white rounded-lg p-4 md:w-1/2"
          title="Tempo de estudo por dia"
        />

        <div className="flex flex-col gap-10 md:gap-5 md:w-1/2">
          <div className="flex h-[32%] md:h-full text-center gap-5">
            <Card
              colorClass="bg-black text-yellow-400"
              widthClass="w-full"
              heightClass="h-full"
            />
          </div>

          <div className="flex flex-col items-center text-center justify-center">
            <ChartComponentPie
              className="text-white rounded-lg w-full md:w-3/4 lg:w-1/2"
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
