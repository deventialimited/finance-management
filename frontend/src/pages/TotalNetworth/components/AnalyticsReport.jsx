import React from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';

const AnalyticsReport = () => {
  const options = {
    series: [
      {
        name: 'Analytics Report',
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
        categories: [
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
        ],
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
    <div className="w-full mt-2 text-[#acacad]">
      <div className="  sm:p-4">
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

export default AnalyticsReport;
