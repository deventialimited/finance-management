import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TopTwoCards = () => {
  const areaOptions = {
    series: [
      {
        name: 'Spending',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
    series: [
      {
        data: [20, 30, 45, 50, 49, 60],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          style: {
            colors: ['#939393'],
            fontWeight: '600', // Semibold
          },
          offsetX: 10,
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

  const progressBars = [
    { label: 'Gaming PC', value: 309 },
    { label: 'New house', value: 950 },
    { label: 'Summer trip', value: 550 },
    { label: 'Wedding', value: 620 },
    { label: 'Top up game', value: 170 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="">
        <div className=" grid grid-cols-1 sm:grid-cols-10 gap-3 sm:gap-1">
          <div className=" bg-[#71299d] sm:h-[80%] flex flex-col justify-between rounded-lg px-3 py-4 col-span-6">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center gap-2">
                <img src="/images/icon/icon-park-outline_protect.svg" />
                <span className=" font-semibold text-xl text-white">
                  $27.000
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
            <h3 className="text-lg font-extrabold text-black">87%</h3>
            <div className="-mt-10">
              <ReactApexChart
                options={areaOptions.options}
                series={areaOptions.series}
                type="area"
                height={150}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between shadow my-3 rounded-2xl items-center px-4 py-8'>
          <h3 className=' text-black font-bold text-xl'>Annual Graphs</h3>
          <h3 className=' text-black font-bold flex items-center flex-col text-2xl'>
            $540 <br /> <span className=' font-medium text-xs text-[#71299d]'>Total saving</span>
          </h3>
        </div>
        <div className="bg-white">
          <ReactApexChart
            options={barOptions.options}
            series={barOptions.series}
            type="bar"
            height={200}
          />
        </div>
      </div>
      <div className="bg-white p-4 py-8 border border-[#e8e7e7] h-max my-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-black mb-4">My Savings</h2>
        {progressBars.map((item, index) => (
         <div key={index} className='flex gap-3 items-center text-black font-semibold text-xl'>
           <div  className="flex flex-col w-full gap-2 justify-between">
            <span>{item.label}</span>
            <div className="w-full bg-[#e8e7e7] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#71299d] h-full"
              style={{ width: `${item.value / 10}%` }}
            ></div>
          </div>
          </div>
          <span>${item.value}</span>
         </div>
        ))}
      </div>
    </div>
  );
};

export default TopTwoCards;
