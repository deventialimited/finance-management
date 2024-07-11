import React from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';
const WeeklyComparison = () => {
  const options = {
    series: [
      {
        data: [160, 50, 80, 120, 180, 200, 150],
      },
      {
        data: [100, 60, 90, 110, 140, 190, 130],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$ ${val}K`;
          },
        },
      },
      colors: ['#723097', '#e8e8e8'],
    },
  };
  return (
    <div className="w-full text-[#7c7c80]">
      <h2 className="text-2xl mb-4">Statistics</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <DropdownList
          dropDownoptions={['Weekly Comparison', 'Monthly Comparison']}
          type={'Weekly Comparison'}
        />
        <ReactApexChart
          options={options.options}
          series={options.series}
          type="bar"
          height={250}
        />
      </div>
    </div>
  );
};

export default WeeklyComparison;
