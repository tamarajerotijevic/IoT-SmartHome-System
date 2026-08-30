import { useEffect, useState } from "react";

import { getSensorData } from "../services/api";
import SensorCard from "../components/SensorCard";

import DeviceCard from "../components/DeviceCard";
import { getDevices } from "../services/api";

import LightControl from "../components/LightControl";


function Dashboard() {
  const [sensorData, setSensorData] = useState(null);

  const [devices, setDevices] = useState([]);

  useEffect(() => {
     const loadSensorData = () => {

        getSensorData()
            .then((response) => {

                const data = response.data;

                if (data.length > 0) {
                    // Uzimamo poslednji zapis
                    setSensorData(data[data.length - 1]);
                }

            })
            .catch((error) => {
                console.log(error);
            });
  };

  loadSensorData();

  const interval = setInterval(
        loadSensorData,
        2000
    );


    return () => {
        clearInterval(interval);
    };

}, []);



  if (!sensorData) {
    return <p className="p-10 text-slate-700">Loading...</p>;
  }


   


  return (
    <div className="min-h-screen bg-[#668586] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Smart Home Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Here you can monitor your smart home devices and sensor data in real-time
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3 ">
            <SensorCard 
              title="Temperature"
              value={sensorData.temperature}
              unit="°C"
            />
            <SensorCard title="Humidity" value={sensorData.humidity} unit="%" />
            <SensorCard
              title="Motion"
              value={sensorData.motion ? "Detected" : "No movement"}
              unit=""
            />
          </div>
        </section>

        <LightControl />
      </div>
    </div>
  );
}

export default Dashboard;
