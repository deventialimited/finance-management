import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const Statistics = () => {
  const [selectedOption, setSelectedOption] = useState('Weekly Comparison');
  const { expenses } = useBackendDataStore();
  const [seriesData, setSeriesData] = useState({ current: [], previous: [] });

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastYear = currentYear - 1;

    const calculateWeeklyTotals = (startDate) => {
      const totals = new Array(7).fill(0);
      expenses.forEach((category) => {
        category.lists.forEach((expense) => {
          const expenseDate = new Date(expense.expenseDate);
          if (
            expenseDate >= startDate &&
            expenseDate <
              new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
          ) {
            const dayOfWeek = expenseDate.getDay();
            totals[dayOfWeek] += expense.amount;
          }
        });
      });
      return totals;
    };

    const calculateMonthlyTotals = (year) => {
      const totals = new Array(12).fill(0);
      expenses.forEach((category) => {
        category.lists.forEach((expense) => {
          const expenseDate = new Date(expense.expenseDate);
          if (expenseDate.getFullYear() === year) {
            const month = expenseDate.getMonth();
            totals[month] += expense.amount;
          }
        });
      });
      return totals;
    };

    if (selectedOption === 'Weekly Comparison') {
      const currentWeekStart = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay()),
      );
      const lastWeekStart = new Date(currentWeekStart);
      lastWeekStart.setDate(currentWeekStart.getDate() - 7);

      setSeriesData({
        current: calculateWeeklyTotals(currentWeekStart),
        previous: calculateWeeklyTotals(lastWeekStart),
      });
    } else if (selectedOption === 'Yearly Comparison') {
      setSeriesData({
        current: calculateMonthlyTotals(currentYear),
        previous: calculateMonthlyTotals(lastYear),
      });
    }
  }, [expenses, selectedOption]);

  const options = {
    series: [
      {
        name:
          selectedOption === 'Weekly Comparison' ? 'This week' : 'This year',
        data: seriesData.current,
      },
      {
        name:
          selectedOption === 'Weekly Comparison' ? 'Last week' : 'Last year',
        data: seriesData.previous,
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
        categories:
          selectedOption === 'Weekly Comparison'
            ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
    <div className="w-full text-[#7c7c80]">
      <h2 className="text-2xl mb-4 p-2">Statistics</h2>
      <div className="bg-white rounded-lg shadow sm:p-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <DropdownList
            dropDownoptions={['Weekly Comparison', 'Yearly Comparison']}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <div className="flex self-end items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#723097]"></span>
              <h3 className=" font-bold">
                This {selectedOption === 'Weekly Comparison' ? 'week' : 'year'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 rounded-sm h-2 bg-[#e8e8e8]"></span>
              <h3 className=" font-bold">
                Last {selectedOption === 'Weekly Comparison' ? 'week' : 'year'}
              </h3>
            </div>
          </div>
        </div>
        {expenses?.length > 0 ? (
          <ReactApexChart
            options={options.options}
            series={options.series}
            type="bar"
            height={250}
          />
        ) : (
          <h3 className=" text-center my-6 text-black">No Graph Data</h3>
        )}
      </div>
    </div>
  );
};

export default Statistics;
