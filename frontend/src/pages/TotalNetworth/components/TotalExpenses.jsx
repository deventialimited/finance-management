import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const DonutChart = ({ categoryTotals, categoryLabels }) => {
  const chartOptions = {
    series: categoryTotals,
    options: {
      chart: {
        type: 'donut',
      },
      labels: categoryLabels,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 0,
      },
      colors: ['#AFAFAF', '#71299D', '#18023C', '#3B3F48'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="w-full mt-4 text-[#acacad]">
      <div className="flex justify-center sm:p-4">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          width="380"
        />
      </div>
    </div>
  );
};

const TotalExpenses = () => {
  const { expenses } = useBackendDataStore();
  const [dailyTotal, setDailyTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [categoryLabels, setCategoryLabels] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    let dailyTotal = 0;
    let weeklyTotal = 0;
    let monthlyTotal = 0;
    const categoryTotals = {};

    expenses.forEach((category) => {
      category.lists.forEach((expense) => {
        const expenseDate = new Date(expense.expenseDate);
        const amount = expense.amount;

        if (expenseDate.toDateString() === currentDate.toDateString()) {
          dailyTotal += amount;
        }
        if (expenseDate >= startOfWeek && expenseDate <= currentDate) {
          weeklyTotal += amount;
        }
        if (expenseDate >= startOfMonth && expenseDate <= currentDate) {
          monthlyTotal += amount;
        }
        const categoryName = category.category;
        if (!categoryTotals[categoryName]) {
          categoryTotals[categoryName] = 0;
        }
        categoryTotals[categoryName] += amount;
      });
    });
    setDailyTotal(dailyTotal);
    setWeeklyTotal(weeklyTotal);
    setMonthlyTotal(monthlyTotal);
    setCategoryTotals(Object.values(categoryTotals));
    setCategoryLabels(Object.keys(categoryTotals));
  }, [expenses]);

  return (
    <div className="p-4">
      <h2 className="text-2xl text-black font-semibold">Total Expenses</h2>
      {expenses?.length > 0 ? (
        <>
          <div className="flex items-center justify-between text-lg font-medium">
            <div>
              <div>Daily</div>
              <div className="text-black font-medium">
                ${dailyTotal.toLocaleString()}
              </div>
            </div>
            <div>
              <div>Weekly</div>
              <div className="text-black font-medium">
                ${weeklyTotal.toLocaleString()}
              </div>
            </div>
            <div>
              <div>Monthly</div>
              <div className="text-black font-medium">
                ${monthlyTotal.toLocaleString()}
              </div>
            </div>
          </div>
          <DonutChart
            categoryTotals={categoryTotals}
            categoryLabels={categoryLabels}
          />
        </>
      ) : (
        <h3 className=" text-center my-6 text-black">No Graph Data</h3>
      )}
    </div>
  );
};

export default TotalExpenses;
