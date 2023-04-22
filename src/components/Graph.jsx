import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  scales: {
    y: {
      grid: {
        drawBorder: true,
        color: "#FFFFFF",
      },
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },

      max: 100,
    },
    x: {
      ticks: {
        color: "white",
        font: {
          size: 15,
          weight: "bold",
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      display: false,
      labels: {
        color: "white",
        fontSize: 12,
        font: "white",
      },
    },
    title: {
      display: true,
      text: "Desempeño",
      font: {
        color: "red",
      },
    },
  },

  barThickness: 50,
  maxBarThickness: 50,
};

const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#8BC34A",
  "#FF9800",
  "#9C27B0",
];
const Graph = ({ results }) => {
  console.log(results);
  const data = {
    //   labels,
    labels: results.map((res) => res.test__name),

    datasets: [
      {
        data: results.map((res) => res.score),
        backgroundColor: colors.slice(0, results.length),
      },
    ],
  };
  return (
    <div className="mx-auto pb-10  w-full lg:w-2/5 md:w-1/2 sm:w-1/4">
      <div className="text-3xl font-bold text-center m-10">
        Gráfica de tu desempeño
      </div>
      <div>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph;
