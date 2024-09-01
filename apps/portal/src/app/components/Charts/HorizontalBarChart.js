import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { m } from 'framer-motion';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = (data) => {
  const [chartData, setChartData] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [30, 50, 40, 60, 80, 70, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [40, 60, 50, 70, 90, 80, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  });

  const handleData = (data) => {
    const labels = Array.from(new Set(data.map((item) => item.label))); // Mengubah Set menjadi array

    const lakiLakiData = labels.map((label) => {
      const item = data.find(
        (d) => d.label === label && d.label_2 === 'LAKI-LAKI'
      );
      return item ? item.total : 0;
    });

    const perempuanData = labels.map((label) => {
      const item = data.find(
        (d) => d.label === label && d.label_2 === 'PEREMPUAN'
      );
      return item ? item.total : 0;
    });

    setChartData((prevData) => ({
      ...prevData,
      labels: labels,
      datasets: [
        {
          label: 'Laki-Laki',
          data: lakiLakiData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Perempuan',
          data: perempuanData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }));

    // console.log(database);
  };

  useEffect(() => {
    console.log(data, 'database');
    if (data.database && data.database.length > 0) {
      // console.log(data.database, 'pie');
      handleData(data.database);
    }
  }, []);

  const options = {
    indexAxis: 'y', // Untuk membuat bar chart horizontal
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Horizontal Bar Chart',
      // },
    },
    scales: {
      x: {
        beginAtZero: true, // Mulai dari 0
      },
    },
  };

  return (
    <div className="relative h-64 md:h-96 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
