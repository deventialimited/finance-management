import React from 'react';
import Chart from 'react-apexcharts';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';

const RadialChart = () => {
  const chartOptions = {
    series: [67, 24],
    options: {
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Time',
              formatter: function (w) {
                return 249;
              },
            },
          },
        },
      },

      labels: ['Current Month', 'Previous Month'],
      colors: ['#D39CF4', '#71299D'],
    },
  };
  return (
    <div>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="radialBar"
        height="350"
      />
      <div className="flex items-center justify-center my-5">
        <div className="flex flex-col border-l-2 border-[#D39CF4] px-3">
          <div className="text-black font-semibold">$ 8,140,55</div>
          <div className="flex items-center gap-1">
            <div>Current Month</div>
            <IoIosArrowRoundUp size={24} className="text-[#D39CF4]" />
          </div>
        </div>
        <div className="flex flex-col border-l-2 border-[#D39CF4] px-3">
          <div className="text-black font-semibold">$ 8,140,55</div>
          <div className="flex items-center gap-1">
            <div>Previous Month</div>
            <IoIosArrowRoundDown size={24} className="text-[#71299D]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialChart;
