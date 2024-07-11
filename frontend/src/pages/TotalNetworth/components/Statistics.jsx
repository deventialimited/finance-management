import React from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';

const Statistics = () => {
  const options = {
    series: [
      {
        name: 'one week',
        data: [100, 60, 90, 110, 140, 190, 130, 100, 55, 79, 110, 65],
      },
      {
        name: 'one month',
        data: [100, 60, 90, 110, 140, 190, 130, 100, 55, 79, 110, 65],
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            colors: ['#7c7c80'],
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return `${val}K`;
          },
          style: {
            colors: ['#7c7c80'],
          },
        },
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
      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: ['#7c7c80'],
        },
      },
    },
  };

  return (
    <div className="w-full mt-8 text-[#7c7c80]">
      <div>
        <h2 className="text-xl mb-2">Total Net Worth</h2>
        <h2 className="text-2xl mb-4 text-black font-semibold">$728,510</h2>
      </div>
      <div className="bg-white rounded-lg shadow sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <DropdownList
            dropDownoptions={['Weekly Comparison', 'Monthly Comparison']}
            type={'Weekly Comparison'}
          />
          <div className="flex self-end flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#723097]"></span>
              <h3 className=" font-bold">Live</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#e8e8e8]"></span>
              <h3 className=" font-bold">One week</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#e8e8e8]"></span>
              <h3 className=" font-bold">One Month</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#e8e8e8]"></span>
              <h3 className=" font-bold">One Year</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#e8e8e8]"></span>
              <h3 className=" font-bold">All</h3>
            </div>
          </div>
        </div>
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

export default Statistics;
