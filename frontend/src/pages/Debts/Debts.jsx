// /components/DonutChart.jsx
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
const DonutChart = () => {
  const chartOptions = {
    series: [44, 55, 41, 27],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['1', '2', '3', '4'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 0,
      },
      colors: ['#fe9a21', '#fd8d8c', '#373b74', '#c0d0fa', '#fe9190'],
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
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '22px',
                fontFamily: 'Arial',
                color: '#373b74',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#373b74',
                offsetY: 10,
                formatter: function () {
                  return '$450';
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: '$450',
                fontSize: '22px',
                fontFamily: 'Arial',
                color: '#373b74',
              },
            },
          },
        },
      },
      legend: {
        position: 'left',
        offsetY: 0,
        height: 150,
      },
    },
  };

  return (
    <div className="w-full mt-4 text-[#acacad]">
      <div className="flex bg-[#f0f0f0] rounded-lg justify-center sm:p-4">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          height={250}
          width="250"
        />
      </div>
    </div>
  );
};

// /components/Card.jsx
const Card = ({ debtName, debtToPay, debtPaid, leftToSave }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <div className="flex items-center justify-center gap-4 py-4">
        <h3 className=" text-lg font-semibold  text-black">E commerce Debts</h3>
        <div className=" flex items-center gap-2">
          <img src="/images/icon/icon-black-plus.svg" />
          <img src="/images/icon/icon-black-three-dots.svg" />
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black text-center bg-[#e9d7f4] rounded-md px-4 py-3 mb-4">
        {debtName}
      </h2>
      <DonutChart />
      <div className="mt-4 text-[#777777]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f0f0f0]">
              <th className=" text-black text-start py-2 px-3">Debts</th>
              <th className=" text-black text-start py-2 px-3">$</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b border-[#d3d2d2]">
              <td className="text-gray-700 text-start py-2 px-3">
                Debt To Pay
              </td>
              <td className="text-gray-700 text-start py-2 px-3">
                ${debtToPay}
              </td>
            </tr>
            <tr className=" border-b border-[#d3d2d2]">
              <td className="text-gray-700 text-start py-2 px-3">Debt Paid</td>
              <td className="text-gray-700 text-start py-2 px-3">
                ${debtPaid}
              </td>
            </tr>
            <tr className=" border-b border-[#d3d2d2]">
              <td className="text-gray-700 text-start py-2 px-3">
                Left To Save
              </td>
              <td className="text-gray-700 text-start py-2 px-3">
                ${leftToSave}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center">
        <button className=" text-black border-2 font-semibold w-max  rounded-full py-2 px-4 mt-4">
          View details
        </button>
      </div>
    </div>
  );
};

// /pages/index.jsx
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import DefaultLayout from '../../layout/DefaultLayout';
import Header from './components/Header/index';
const data = [
  {
    debtName: 'Debt Name 1',
    debtToPay: 100,
    debtPaid: 100,
    leftToSave: 100,
  },
  {
    debtName: 'Debt Name 1',
    debtToPay: 100,
    debtPaid: 100,
    leftToSave: 100,
  },
  {
    debtName: 'Debt Name 1',
    debtToPay: 100,
    debtPaid: 100,
    leftToSave: 100,
  },
];

const Debts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <div className="flex justify-center flex-wrap">
        {data.map((item, index) => (
          <Card
            key={index}
            debtName={item.debtName}
            debtToPay={item.debtToPay}
            debtPaid={item.debtPaid}
            leftToSave={item.leftToSave}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Debts;
