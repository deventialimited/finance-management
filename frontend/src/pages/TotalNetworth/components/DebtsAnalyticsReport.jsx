import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DropdownList from './DropdownList';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const DebtsAnalyticsReport = () => {
  const [comparisonType, setComparisonType] = useState('Yearly');
  const { debts } = useBackendDataStore();
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const calculateMonthlyTotals = (year) => {
      const totals = new Array(12).fill(0);
      debts.forEach((debt) => {
        debt.payments.forEach((payment) => {
          const paymentDate = new Date(debt.createdAt); // Assuming debts have a `createdAt` date
          if (paymentDate.getFullYear() === year) {
            const month = paymentDate.getMonth();
            totals[month] += payment.amount;
          }
        });
      });
      return totals;
    };

    if (comparisonType === 'Yearly') {
      setSeriesData(calculateMonthlyTotals(currentYear));
    }
  }, [debts, comparisonType]);

  const options = {
    series: [
      {
        name: 'Debts Report',
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
      {debts?.length > 0 ? (
        <div className="bg-white rounded-lg shadow sm:p-4">
          <ReactApexChart
            options={options.options}
            series={options.series}
            type="area"
            height={250}
          />
        </div>
      ) : (
        <h3 className=" text-center my-6 text-black">No Graph Data</h3>
      )}
    </div>
  );
};

export default DebtsAnalyticsReport;
