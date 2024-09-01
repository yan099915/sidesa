import React from 'react';
import { Line } from 'react-chartjs-2';

const MultiAxisLineChart = () => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 15, 40, 30, 60, 70, 40, 20, 60, 100, 55],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Dataset 2',
        data: [15, 25, 35, 30, 40, 30, 60, 44, 32, 55, 16, 55],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default MultiAxisLineChart;
