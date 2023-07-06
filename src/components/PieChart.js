import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';


const PieChart = ({ items }) => {
  // Count the number of completed and not completed items
  const completedCount = items.filter((item) => item.completed).length;
  const notCompletedCount = items.length - completedCount;

  // Calculate the completion percentage
  const completionPercentage = (completedCount / items.length) * 100;

  // Prepare chart data
  const chartData = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completedCount, notCompletedCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h3>Completion Percentage: {completionPercentage.toFixed(2)}%</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
