import React from 'react';
import Chart from 'react-apexcharts';

const TopThreeCards = () => {
  const cards = [
    {
      title: 'Spend this week',
      value: '$540',
      change: '-2.5%',
      changeType: 'decrease',
      chartData: {
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
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      }
      
    },
    {
      title: 'Total cashback',
      value: '$1,531',
      change: '+5.4%',
      changeType: 'increase',
      categories: [
        { icon: 'path/to/icon1.svg', percentage: 20 },
        { icon: 'path/to/icon2.svg', percentage: 30 },
        { icon: 'path/to/icon3.svg', percentage: 50 },
      ],
      progressBar: 80, // Percentage value for progress bar
    },
    {
      title: 'Spending trend',
      value: '87%',
      change: '+4.5%',
      changeType: 'increase',
      chartData: {
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
            className={`text-sm font-bold ${cards[0].changeType === 'decrease' ? 'text-red-500' : 'text-green-500'}`}
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
              className={`text-sm font-bold ${cards[1].changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}
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
            className={`text-sm font-bold ${cards[2].changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}
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
