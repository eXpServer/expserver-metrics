import styles from "./line.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function getRandomNumbers(n, min, max) {
  const data = [];
  for (let i = 0; i < n; i++) {
    let temp = min + (max - min) * Math.random(2);
    data.push(temp.toFixed(2));
  }
  return data;
}

export default function LineGraph({ graphData, height }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (graphData) {
      setInterval(() => {
        const data = {
          labels: getRandomNumbers(60, 0.0, 100),
          datasets: [
            {
              label: "Dataset 1",
              data: getRandomNumbers(60, 0.0, 1000000),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "#737bff",
              borderWidth: 2,
              borderRadius: 0,
              lineTension: 0.2,
            },
            {
              label: "Dataset 2",
              data: getRandomNumbers(60, 0.0, 1000000),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              borderColor: "#5cdf939c",
              borderWidth: 2,
              borderRadius: 0,
              lineTension: 0.4,
            },
          ],
          options: {
            plugins: {
              legend: false,
            },
            interaction: {
              mode: "index",
              intersect: false,
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Seconds ago",
                },
              },
              y: {
                ticks: {
                  stepSize: 1,
                },
              },
            },
            elements: {
              point: {
                radius: 1,
              },
            },
            maintainAspectRatio: false,
          },
        };
        setData(data);
      }, 1000);
    }
  }, [graphData]);

  return (
    <div className={styles.container}>
      {data ? (
        <Line data={data} options={data?.options} height={height} />
      ) : null}
    </div>
  );
}
