import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = () => {
  const chartOptions = {
    series: [44, 55, 41, 27],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Shoping', 'Workspace', 'Platform', 'Entertainments'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 0,
      },
      colors: ['#AFAFAF', '#71299D', '#18023C', '#3B3F48'],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  return (
    <div className="w-full mt-4 text-[#acacad]">
      <div className="flex justify-center  sm:p-4">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          width="380"
        />
      </div>
    </div>
  );
};

export default DonutChart;
