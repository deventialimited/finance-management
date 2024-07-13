import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const TopTwoCards = () => {
  const { savings } = useBackendDataStore();
  console.log(savings);
  const [progressBars, setProgressBars] = useState(null);
  const [totalSavingsAmount, setTotalSavingsAmount] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Get current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Filter savings data for current month and year
    const filteredSavings = savings.filter((saving) => {
      const savingDate = new Date(saving.createdAt);
      return (
        savingDate.getMonth() === currentMonth &&
        savingDate.getFullYear() === currentYear
      );
    });

    // Calculate daily totals for the current month
    const dailyTotals = new Array(daysInMonth).fill(0);
    filteredSavings.forEach((saving) => {
      const savingDate = new Date(saving.createdAt).getDate() - 1;
      dailyTotals[savingDate] += saving.accumulatedAmount;
    });

    // Prepare data for area graph
    const labels = Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
    const data = dailyTotals;

    setDailyData({ labels, data });
  }, [savings]);

  useEffect(() => {
    // Initialize all months
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();

    // Group savings by month and calculate monthly totals
    const monthlyTotals = months.reduce((acc, month) => {
      const key = `${month}/${currentYear}`;
      acc[key] = 0;
      return acc;
    }, {});

    savings.forEach((saving) => {
      const savingDate = new Date(saving.createdAt);
      if (savingDate.getFullYear() === currentYear) {
        const monthYear = `${savingDate.getMonth() + 1}/${savingDate.getFullYear()}`;
        if (monthlyTotals[monthYear] !== undefined) {
          monthlyTotals[monthYear] += saving.accumulatedAmount;
        }
      }
    });

    // Prepare data for bar graph
    const labels = Object.keys(monthlyTotals);
    const data = Object.values(monthlyTotals);

    setMonthlyData({ labels, data });
  }, [savings]);

  useEffect(() => {
    // Step 1: Calculate total accumulatedAmount and totalSavingsAmount
    let totalSavingsAmount = 0;
    const categoryTotals = savings?.reduce((acc, curr) => {
      if (acc[curr.category]) {
        acc[curr.category].totalAmount += curr.accumulatedAmount;
      } else {
        acc[curr.category] = {
          label: curr.category,
          totalAmount: curr.accumulatedAmount,
        };
      }
      totalSavingsAmount += curr.accumulatedAmount;
      return acc;
    }, {});

    // Step 2: Convert categoryTotals object into progressBarsData array format
    const progressBarsData = Object.values(categoryTotals);

    // Step 3: Sort progressBarsData by totalAmount in descending order
    progressBarsData.sort((a, b) => b.totalAmount - a.totalAmount);

    // Step 4: Calculate percent for each progress bar
    const highestTotalAmount =
      progressBarsData.length > 0 ? progressBarsData[0].totalAmount : 0;
    progressBarsData.forEach((bar) => {
      bar.percent = Math.round((bar.totalAmount / highestTotalAmount) * 100);
    });
    setTotalSavingsAmount(totalSavingsAmount);
    setProgressBars(progressBarsData);
  }, [savings]);

  const areaOptions = {
    series: [{ data: dailyData?.data || [] }],
    options: {
      chart: {
        type: 'area',
        height: 100,
        toolbar: {
          show: false,
        },
        width: '100%', // Ensure the chart takes full width
        height: '100%', // Ensure the chart takes full width
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#71299d'], // Set line color to purple
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
              color: '#e8faf3',
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
        categories: dailyData?.labels || [],
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
  };

  const barOptions = {
    series: [{ data: monthlyData?.data || [] }],
    options: {
      chart: {
        type: 'bar',
        height: 100,
        toolbar: {
          show: false,
        },
      },
      colors: ['#5c93fe', '#71299d', '#d39cf3'],
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
          borderRadius: 5,
          columnWidth: '50%', // Adjust this value to create the gap
          barHeight: '80%', // Adjust this value if necessary
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
            colors: ['#939393'],
            fontWeight: '600', // Semibold
          },
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
          formatter: function (val) {
            return `$${val}K`;
          },
          style: {
            colors: ['#939393'],
            fontWeight: '600', // Semibold
          },
          offsetX: 0,
          offsetY: 20, // 3rem gap
        },
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="">
        <div className=" grid grid-cols-1 sm:grid-cols-10 gap-3 sm:gap-1">
          <div className=" bg-[#71299d] sm:h-[80%] min-h-32 flex flex-col justify-between rounded-lg px-3 py-4 col-span-6">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center gap-2">
                <img src="/images/icon/icon-park-outline_protect.svg" />
                <span className=" font-semibold text-xl text-white">
                  ${totalSavingsAmount}.00
                </span>
              </h3>
              <div className=" rounded-full p-1 bg-[#58197f]">
                <img src="/images/icon/icon-solar_arrow-up-linear.svg" />
              </div>
            </div>
            <h3 className="px-3 font-medium text-white">Total Savings</h3>
          </div>
          <div className="bg-white px-3 sm:px-0 col-span-4">
            <h3 className="text-md font-medium text-[#939393]">This Month</h3>
            {savings?.length > 0 ? (
              <>
                <h3 className="text-lg font-extrabold text-black">87%</h3>
                <div className="-mt-10">
                  <ReactApexChart
                    options={areaOptions.options}
                    series={areaOptions.series}
                    type="area"
                    height={150}
                  />
                </div>
              </>
            ) : (
              <h3 className=" text-center my-4 text-black">No Graph data</h3>
            )}
          </div>
        </div>
        <div className="flex justify-between shadow my-3 rounded-2xl items-center px-4 py-8">
          <h3 className=" text-black font-bold text-xl">Annual Graphs</h3>
          <h3 className=" text-black font-bold flex items-center flex-col text-2xl">
            ${totalSavingsAmount}.00 <br />{' '}
            <span className=" font-medium text-xs text-[#71299d]">
              Total saving
            </span>
          </h3>
        </div>
        <div className="bg-white">
          {savings?.length > 0 ? (
            <ReactApexChart
              options={barOptions.options}
              series={barOptions.series}
              type="bar"
              height={200}
            />
          ) : (
            <h3 className=" text-center my-4 text-black">No Graph data</h3>
          )}
        </div>
      </div>
      <div className="bg-white p-4 py-8 border border-[#e8e7e7] h-max my-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-black mb-4">My Savings</h2>
        {progressBars?.length > 0 ? (
          <>
            {progressBars?.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 items-center text-black font-semibold text-xl"
              >
                <div className="flex flex-col w-full gap-2 justify-between">
                  <span>{item.label}</span>
                  <div className="w-full bg-[#e8e7e7] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#71299d] h-full"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
                <span>${item.totalAmount}</span>
              </div>
            ))}
          </>
        ) : (
          <h3 className=" text-center my-6 text-black">No Savings</h3>
        )}
      </div>
    </div>
  );
};

export default TopTwoCards;
