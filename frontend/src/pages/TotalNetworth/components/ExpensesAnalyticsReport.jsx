import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const ExpensesAnalyticsReport = () => {
  const [comparisonType, setComparisonType] = useState('Yearly');
  const { expenses } = useBackendDataStore();
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calculateDailyTotals = (month, year) => {
      const totals = new Array(daysInMonth).fill(0);
      expenses.forEach((category) => {
        category.lists.forEach((expense) => {
          const expenseDate = new Date(expense.expenseDate);
          if (
            expenseDate.getFullYear() === year &&
            expenseDate.getMonth() === month
          ) {
            const day = expenseDate.getDate() - 1;
            totals[day] += expense.amount;
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

    if (comparisonType === 'Monthly') {
      setSeriesData(calculateDailyTotals(currentMonth, currentYear));
    } else if (comparisonType === 'Yearly') {
      setSeriesData(calculateMonthlyTotals(currentYear));
    }
  }, [expenses, comparisonType]);

  const options = {
    series: [
      {
        name: 'Analytics Report',
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
    <div className="w-full mt-4 text-[#acacad]">
      {expenses?.length > 0 ? (
        <div className="bg-white rounded-lg shadow sm:p-4">
          <ReactApexChart
            options={options.options}
            series={options.series}
            type="area"
            height={250}
          />
        </div>
      ) : (
        <h3 className=' text-center my-6 text-black'>No Graph Data</h3>
      )}
    </div>
  );
};

export default ExpensesAnalyticsReport;
