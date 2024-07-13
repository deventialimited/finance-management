import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const RadialChart = () => {
  const { debts } = useBackendDataStore();
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const [previousMonthTotal, setPreviousMonthTotal] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const calculateMonthlyTotal = (month, year) => {
      let total = 0;
      debts.forEach(debt => {
        debt.payments.forEach(payment => {
          const paymentDate = new Date(debt.createdAt);
          if (paymentDate.getFullYear() === year && paymentDate.getMonth() === month) {
            total += payment.amount;
          }
        });
      });
      return total;
    };

    setCurrentMonthTotal(calculateMonthlyTotal(currentMonth, currentYear));
    setPreviousMonthTotal(calculateMonthlyTotal(previousMonth, previousMonthYear));
  }, [debts]);

  const chartOptions = {
    series: [currentMonthTotal, previousMonthTotal],
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
              formatter: function (val) {
                return `$${val.toLocaleString()}`;
              },
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `$${total.toLocaleString()}`;
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
          <div className="text-black font-semibold">${currentMonthTotal.toLocaleString()}</div>
          <div className="flex items-center gap-1">
            <div>Current Month</div>
            <IoIosArrowRoundUp size={24} className="text-[#D39CF4]" />
          </div>
        </div>
        <div className="flex flex-col border-l-2 border-[#D39CF4] px-3">
          <div className="text-black font-semibold">${previousMonthTotal.toLocaleString()}</div>
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
