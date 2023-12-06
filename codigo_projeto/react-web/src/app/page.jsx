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
      const response = await axios.get("http://10.109.25.74:8000/espinfo/");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="rounded bg-white h-[160vh] w-full p-4 md:p-8 lg:p-12">
      <header className="flex h-1/5 md:h-1/6 items-center ml-4 md:ml-10 text-black text-3xl md:text-5xl mb-5">
        <img src="./ADSMEC_logo.png" className="h-12 w-12" alt="Logo" />
        <div className="text-yellow-400 ml-2 md:ml-4">Dashboards</div>
      </header>

      <div className="flex flex-row bg-gray-200 p-10 rounded gap-5 justify-around ">
        <Chart
          data={data}
          className="bg-purple-500 text-white rounded-lg p-4 h-[70%]"
          title="Tempo de estudo por dia"
        />
        <div className=" flex flex-col gap-10">
          <div className="flex h-[30%] text-center gap-5">
            <Card
              colorClass="bg-black text-yellow-400"
              widthClass="w-full md:w-64"
              heightClass="h-[100%]"
            />
            <Card
              colorClass="bg-yellow-400 text-black"
              widthClass="w-full md:w-64"
              heightClass="h-[100%]"
            />
          </div>
          <div className="flex flex-col items-center text-center justify-center">
            <ChartComponentPie
              className="text-white rounded-lg p-4"
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
