import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/users/1', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const items = data.items;
          const completedCount = items.filter(item => item.completed).length;
          const incompleteCount = items.filter(item => !item.completed).length;

          const chartData = {
            labels: ['Completed', 'Incomplete'],
            datasets: [
              {
                data: [completedCount, incompleteCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
              },
            ],
          };

          setChartData(chartData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartRef.current) {
      Chart.register(...registerables); // Register chart controllers
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: context => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${percentage}%`;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      {chartData ? (
        <canvas ref={chartRef} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PieChart;
