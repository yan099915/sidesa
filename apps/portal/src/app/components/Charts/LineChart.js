import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler, // Import Filler plugin
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import { parse } from 'path';

// Register the necessary components and plugins
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler, // Register the Filler plugin
  Title,
  Tooltip,
  Legend
);

const LineChart = (data) => {
  const [chartData, setChartData] = React.useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 20, 40, 60, 80, 100, 120],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        // fill: true,
        // tension: 0.4, // For curved lines
      },
      {
        label: 'Dataset 2',
        data: [0, 80, 60, 40, 20, 0, 20],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        // fill: true,
        // tension: 0.4, // For curved lines
      },
    ],
  });

  const handleData = (data) => {
    const labels = Array.from(
      new Set(
        data.map((item) =>
          moment()
            .month(item.month - 1)
            .format('MMMM')
        )
      )
    );

    // const totalPengajuanData = Array.from(
    //   new Set(
    //     data.map((item) => {
    //       parseInt(item.total);
    //     })
    //   )
    // );

    const totalPengajuanData = data.map((item) => parseInt(item.total));
    const totalTerselesaikanData = data.map((item) =>
      parseInt(item.total_terselesaikan)
    );

    console.log(totalPengajuanData, 'totalPengajuanData');
    console.log(totalTerselesaikanData, 'totalTerselesaikanData');
    console.log(labels, 'labels');

    setChartData((prevData) => ({
      ...prevData,
      labels: labels,
      datasets: [
        {
          label: 'Total',
          data: totalPengajuanData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Total Terselesaikan',
          data: totalTerselesaikanData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }));

    // console.log(database);
  };

  useEffect(() => {
    if (data.database && data.database.length > 0) {
      // console.log(data.database, 'pie');
      handleData(data.database);
    }
  }, []);

  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
