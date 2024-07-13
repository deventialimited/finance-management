import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const TopThreeCards = () => {
  const { transactions, bills, expenses } = useBackendDataStore();

  const [weekData, setWeekData] = useState({
    totalSpend: 0,
    categories: [],
    categoryTotals: [],
    totalBills: 0,
    billsAmounts: [],
    spendChange: '0%',
    billsChange: '0%',
    spendChangeType: 'no-change',
    billsChangeType: 'no-change',
  });
  const [monthData, setMonthData] = useState({
    totalPaid: 0,
    percentageChange: '0%',
    changeType: 'no-change',
    greaterMonth: 'current', // current or previous
    greaterMonthPercentage: '0%',
  });
  useEffect(() => {
    const calculateMonthlyData = (year, month) => {
      let totalTransactions = 0;
      let totalBills = 0;
      let totalExpenses = 0;

      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        if (
          transactionDate.getFullYear() === year &&
          transactionDate.getMonth() === month
        ) {
          totalTransactions += transaction.amount;
        }
      });

      bills.forEach((bill) => {
        const billDueDate = new Date(bill.dueDate);
        if (
          billDueDate.getFullYear() === year &&
          billDueDate.getMonth() === month
        ) {
          totalBills += bill.amount;
        }
      });

      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.expenseDate);
        if (
          expenseDate.getFullYear() === year &&
          expenseDate.getMonth() === month
        ) {
          totalExpenses += expense.amount;
        }
      });

      return totalTransactions + totalBills + totalExpenses;
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const previousYear = previousMonthDate.getFullYear();
    const previousMonth = previousMonthDate.getMonth();

    const totalPaidCurrentMonth = calculateMonthlyData(
      currentYear,
      currentMonth,
    );
    const totalPaidPreviousMonth = calculateMonthlyData(
      previousYear,
      previousMonth,
    );

    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return '0%';
      const change = ((current - previous) / previous) * 100;
      return Math.min(Math.max(change, 0), 100).toFixed(1) + '%'; // Ensure percentage is between 0 and 100
    };

    const percentageChange = calculatePercentageChange(
      totalPaidCurrentMonth,
      totalPaidPreviousMonth,
    );
    const changeType =
      totalPaidCurrentMonth > totalPaidPreviousMonth
        ? 'increase'
        : totalPaidCurrentMonth < totalPaidPreviousMonth
        ? 'decrease'
        : 'no-change';

    const greaterMonth =
      totalPaidCurrentMonth > totalPaidPreviousMonth ? 'current' : 'previous';
    const greaterMonthPercentage =
      greaterMonth === 'current'
        ? ((totalPaidCurrentMonth / totalPaidPreviousMonth) * 100).toFixed(1) +
          '%'
        : ((totalPaidPreviousMonth / totalPaidCurrentMonth) * 100).toFixed(1) +
          '%';

    setMonthData({
      totalPaid: totalPaidCurrentMonth,
      percentageChange,
      changeType,
      greaterMonth,
      greaterMonthPercentage,
    });
  }, [transactions, bills, expenses]);

  useEffect(() => {
    const categories = [
      'Housing',
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Others',
    ];

    const calculateWeeklyTransactions = (start, end) => {
      const categoryTotals = categories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {});

      let totalSpend = 0;

      transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        if (transactionDate >= start && transactionDate <= end) {
          totalSpend += transaction.amount;
          if (categoryTotals[transaction.category] !== undefined) {
            categoryTotals[transaction.category] += transaction.amount;
          }
        }
      });

      return { totalSpend, categoryTotals };
    };

    const calculateTotalBills = () => {
      let totalBills = 0;
      const billsAmounts = [];

      bills.forEach((bill) => {
        totalBills += bill.amount;
        billsAmounts.push(bill.amount);
      });
      console.log(billsAmounts);
      return { totalBills, billsAmounts };
    };

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(endOfWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);

    const currentWeekTransactions = calculateWeeklyTransactions(
      startOfWeek,
      endOfWeek,
    );
    const lastWeekTransactions = calculateWeeklyTransactions(
      startOfLastWeek,
      endOfLastWeek,
    );
    const totalBillsData = calculateTotalBills();

    const calculateChange = (current, previous) => {
      if (previous === 0) return { change: '0%', changeType: 'no-change' };
      const difference = current - previous;
      const change = ((difference / previous) * 100).toFixed(1) + '%';
      const changeType =
        difference > 0 ? 'increase' : difference < 0 ? 'decrease' : 'no-change';
      return { change, changeType };
    };

    const spendChangeData = calculateChange(
      currentWeekTransactions.totalSpend,
      lastWeekTransactions.totalSpend,
    );

    setWeekData({
      totalSpend: currentWeekTransactions.totalSpend,
      categories,
      categoryTotals: categories.map(
        (category) => currentWeekTransactions.categoryTotals[category],
      ),
      totalBills: totalBillsData.totalBills,
      billsAmounts: totalBillsData.billsAmounts,
      spendChange: spendChangeData.change,
      spendChangeType: spendChangeData.changeType,
    });
  }, [transactions, bills]);

  const cards = [
    {
      title: 'Spend this week',
      value: `$${weekData.totalSpend.toLocaleString()}`,
      change: weekData.spendChange,
      changeType: weekData.spendChangeType,
      chartData: {
        series: [
          {
            data: weekData.categoryTotals,
          },
        ],
        options: {
          chart: {
            type: 'bar',
            height: 100,
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#5c93fe',
            '#71299d',
            '#d39cf3',
            '#AFAFAF',
            '#3B3F48',
            '#FF5733',
          ], // Add more colors if needed
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: false,
              borderRadius: 5,
              columnWidth: '50%',
              barHeight: '80%',
              colors: {
                backgroundBarColors: ['#e0e0e0'],
                backgroundBarOpacity: 1,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: weekData.categories,
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          grid: {
            show: false,
          },
          legend: {
            show: false,
          },
        },
      },
    },
    {
      title: 'Total cashback',
      value: `$${monthData.totalPaid}`,
      change: `${monthData.percentageChange}`,
      changeType: monthData.changeType,
      progressBar: monthData.greaterMonthPercentage,
      categories: [
        { icon: 'path/to/icon1.svg', percentage: 20 },
        { icon: 'path/to/icon2.svg', percentage: 30 },
        { icon: 'path/to/icon3.svg', percentage: 50 },
      ],
    },
    {
      title: 'Spending on Bills',
      value: `$${weekData.totalBills.toLocaleString()}`,
      change: weekData.billsChange,
      changeType: weekData.billsChangeType,
      chartData: {
        series: [
          {
            name: 'Spending',
            data: weekData.billsAmounts,
          },
        ],
        options: {
          chart: {
            type: 'area',
            height: 100,
            toolbar: {
              show: false,
            },
          },
          stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#71299d'],
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
                  color: '#e2faf2',
                  opacity: 0.7,
                },
                {
                  offset: 100,
                  color: '#f5faf8',
                  opacity: 0.9,
                },
              ],
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Adjust according to your data
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          grid: {
            show: false,
          },
          tooltip: {
            y: {
              formatter: (val) => `$${val}`,
            },
          },
        },
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-8">
      {/* Spend This Week Card */}
      <div className="bg-white flex flex-col gap-3 p-3 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[0].title}</h3>
        <div className="pl-2">
          <h3 className="text-2xl font-extrabold text-black">
            {cards[0].value}
          </h3>
          <p
            className={`text-sm font-bold ${
              cards[0].changeType === 'decrease'
                ? 'text-red-500'
                : cards[0].changeType === 'increase'
                ? 'text-green-500'
                : 'text-gray-500'
            }`}
          >
            {cards[0].change}
          </p>
        </div>
        <div className="pl-2 -mt-6">
          <Chart
            options={cards[0].chartData.options}
            series={cards[0].chartData.series}
            type="bar"
            height="150"
          />
        </div>
      </div>

      {/* Total Cashback Card */}
      <div className="bg-white flex flex-col justify-between gap-3 p-3 rounded-2xl shadow">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-medium text-[#939393]">
            {cards[1].title}
          </h3>
          <div className="pl-2">
            <h3 className="text-2xl font-extrabold text-black">
              {cards[1].value}
            </h3>
            <p
              className={`text-sm font-bold ${
                cards[1].changeType === 'increase'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {cards[1].change}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <div className="pl-2">
            <img src="/images/revenues-card2-image.png" />
          </div>
          <div className="mt-3 px-2">
            <div className="h-2 rounded bg-[#e0e0e0]">
              <div
                className="h-2 rounded bg-[#71299d]"
                style={{ width: `${cards[1].progressBar}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Trend Card */}
      <div className="bg-white flex flex-col gap-3 p-3 rounded-2xl shadow">
        <h3 className="text-xl font-medium text-[#939393]">{cards[2].title}</h3>
        <div className="pl-2">
          <h3 className="text-2xl font-extrabold text-black">
            {cards[2].value}
          </h3>
          <p
            className={`text-sm font-bold ${
              cards[2].changeType === 'increase'
                ? 'text-green-500'
                : cards[2].changeType === 'decrease'
                ? 'text-red-500'
                : 'text-gray-500'
            }`}
          >
            {cards[2].change}
          </p>
        </div>
        <div className="pl-2 -mt-6">
          <Chart
            options={cards[2].chartData.options}
            series={cards[2].chartData.series}
            type="area"
            height="150"
          />
        </div>
      </div>
    </div>
  );
};

export default TopThreeCards;
