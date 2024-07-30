import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const AnnualGraph = ({ totalSavingsAmount }) => {
  const [comparisonType, setComparisonType] = useState('Monthly');
  const { savings } = useBackendDataStore();
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calculateDailyTotals = (month, year) => {
      const totals = new Array(daysInMonth).fill(0);
      savings?.forEach((category) => {
        category?.lists?.forEach((saving) => {
          const createdAt = new Date(saving.createdAt);
          if (
            createdAt.getFullYear() === year &&
            createdAt.getMonth() === month
          ) {
            const day = createdAt.getDate() - 1;
            totals[day] += saving.accumulatedAmount;
          }
        });
      });
      return totals;
    };

    const calculateMonthlyTotals = (year) => {
      const totals = new Array(12).fill(0);
      savings?.forEach((category) => {
        category?.lists?.forEach((saving) => {
          const createdAt = new Date(saving.createdAt);
          if (createdAt.getFullYear() === year) {
            const month = createdAt.getMonth();
            totals[month] += saving.accumulatedAmount;
          }
        });
      });
      return totals;
    };

    if (comparisonType === 'Monthly') {
      setSeriesData(calculateDailyTotals(currentMonth, currentYear));
    } else if (comparisonType === 'Yearly') {
      setSeriesData(calculateMonthlyTotals(currentYear));
    }
  }, [savings, comparisonType]);

  const options = {
    series: [
      {
        name: 'Annual Graphs',
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
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
        categories:
          comparisonType === 'Monthly'
            ? Array.from({ length: new Date().getDate() }, (_, i) => `${i + 1}`)
            : [
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
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: ['#000'],
            fontWeight: '600', // Semibold
          },
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
          <h2 className="text-2xl text-black font-semibold mb-4">
            Annual Graphs
          </h2>
          <div className="flex gap-3 items-center ">
            {/* <h3 className=" text-black font-bold flex items-center flex-col text-2xl">
              ${totalSavingsAmount}.00 <br />{' '}
              <span className=" font-medium text-xs text-[#71299d]">
                Total saving
              </span>
            </h3> */}
            {savings?.length > 0 && (
              <DropdownList
                dropDownoptions={['Monthly', 'Yearly']}
                selectedOption={comparisonType}
                setSelectedOption={setComparisonType}
              />
            )}
          </div>
        </div>

        {savings?.length > 0 ? (
          <ReactApexChart
            options={options.options}
            series={options.series}
            type="area"
            height={250}
          />
        ) : (
          <h3 className=" text-center my-6 text-black">No Graph Data</h3>
        )}
      </div>
    </div>
  );
};

export default AnnualGraph;
