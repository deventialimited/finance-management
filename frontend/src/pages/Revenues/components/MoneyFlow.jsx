import React from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';

const MoneyFlow = () => {
  const options = {
    series: [
      {
        name: 'Money Flow',
        data: [78560, 50680, 60220, 75800, 69000, 83000],
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#723097'], // Purple line color
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
          colorStops: [
            {
              offset: 0,
              color: '#723097',
              opacity: 0.7,
            },
            {
              offset: 100,
              color: '#e8dcef',
              opacity: 0.9,
            },
          ],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: ['#000'],
            fontWeight: '600', // Semibold
          },
          offsetX: 10,
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return `$${val / 1000}K`;
          },
          style: {
            colors: ['#000'],
            fontWeight: '600', // Semibold
          },
          offsetX: 0,
          offsetY: 20, // 3rem gap
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `$${val}`;
          },
        },
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <div className="w-full mt-8 text-[#acacad]">
      <div className="bg-white rounded-lg shadow sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h2 className="text-2xl text-black font-semibold mb-4">Money Flow</h2>
          <div className="flex gap-3 items-center">
            <DropdownList
              dropDownoptions={['6 Month', '1 Year']}
              type={'6 Month'}
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-4 rounded-sm h-2 bg-[#723097]"></span>
                <h3 className="font-medium">Money Flow</h3>
              </div>
            </div>
          </div>
        </div>
        <ReactApexChart
          options={options.options}
          series={options.series}
          type="area"
          height={250}
        />
      </div>
    </div>
  );
};

export default MoneyFlow;
