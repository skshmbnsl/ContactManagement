import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios"; // Import axios

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { MapContainer, TileLayer } from "react-leaflet";
import WorldMap from "../Components/WorldMap";

const Dashboard: React.FC = () => { // Define Dashboard as a functional component with TypeScript

  const [countriesData, setCountriesData] = useState<any[]>([]); // Define countriesData as an array of any type
  const [chartData, setChartData] = useState<any>({}); // Define chartData as any type

  useEffect(() => {
    axios(
      "https://disease.sh/v3/covid-19/countries"
    )
      .then((res) => {
        const data = res.data;
        setCountriesData(data);
      });
  }, []);

  useEffect(() => {
    axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    ).then((res) => {
      const data = res.data;
      const newChartData = {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(data.cases),
            fill: false,
            borderColor: "#f50057",
            tension: 0.2,
          },
        ],
      };
      setChartData(newChartData);
    });

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  return (
    <div className="  w-full pt-20 px-4 pb-8" >
      <h1 className="text-4xl font-bold mb-4 text-grey-600">Corona Cases Chart</h1>
      <div className="border-2 border-yellow-100 w-11/12  m-auto 10 auto 10" >
        {
          chartData.datasets ?
            <Line data={chartData} /> : <h1 className="text-yellow-600 mb-4 font-bold text-2xl">Loading...</h1>
        }
      </div>
      <h1 className="text-4xl font-bold mb-4 mt-4text-grey-600  ">Corona Cases World Map</h1>
      <div className="border-2 border-blue-500 w-11/12  m-auto 5 auto 5">
        <MapContainer
          className="m-auto w-full  border-blue-700"
          bounds={[[-60, -180], [85, 180]]} zoom={2}
          center={[20, 40]}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <WorldMap countriesData={countriesData} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
