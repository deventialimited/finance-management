// /components/DonutChart.jsx
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
const DonutChart = ({ payments }) => {
  const chartOptions = {
    series: payments?.map((payment) => parseFloat(payment)),
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Debt Paid', 'Debt To Pay', 'Left To Save'],
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
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '22px',
                fontFamily: 'Arial',
                color: '#373b74',
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce(
                    (a, b) => a + b,
                    0,
                  );
                  return `$${total}`;
                },
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
          height={350}
        />
      </div>
    </div>
  );
};

// /components/Card.jsx
const Card = ({
  debtName,
  category,
  debtPaid,
  debtToPay,
  leftToSave,
  debtId,
}) => {
  const { debts, updateAllDebts } = useBackendDataStore();
  const navigate = useNavigate();
  const handleDeleteDebt = async (id) => {
    try {
      const result = await deleteDebt(id);
      if (result) {
        console.log('Debt deleted successfully', result);
        // Reset form or show success message
        const fetchedDebts = await getAllDebts();
        updateAllDebts(fetchedDebts || []);
      }
    } catch (error) {
      console.error('Error deleting debt', error);
      // Handle error state or feedback to the user
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4">
      <div className="flex items-center justify-between gap-4 py-4">
        <h3 className="text-lg font-semibold text-black">{category} Debts</h3>
        <div className="flex items-center gap-2">
          <img
            onClick={() =>
              navigate('/edit-debts', {
                state: {
                  prevDN: debtName,
                  prevC: category,
                  prevdebtPaid: debtPaid,
                  prevdebtToPay: debtToPay,
                  prevleftToSave: leftToSave,
                  id: debtId,
                },
              })
            }
            src="/images/icon/icon-gray-edit.svg"
            alt="Edit"
            className=" cursor-pointer"
          />
          <img
            onClick={() => handleDeleteDebt(debtId)}
            className=" cursor-pointer"
            src="/images/icon/icon-gray-delete.svg"
            alt="Delete"
          />
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black text-center bg-[#e9d7f4] rounded-md px-4 py-3 mb-4">
        {debtName}
      </h2>
      <DonutChart payments={[debtPaid, debtToPay, leftToSave]} />
      <div className="mt-4 text-[#777777]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f0f0f0]">
              <th className="text-black text-start py-2 px-3">Debts</th>
              <th className="text-black text-start py-2 px-3">$</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#d3d2d2]">
              <td className="text-gray-700 text-start py-2 px-3">Debt Paid</td>
              <td className="text-gray-700 text-start py-2 px-3">
                ${debtPaid}
              </td>
            </tr>
            <tr className="border-b border-[#d3d2d2]">
              <td className="text-gray-700 text-start py-2 px-3">
                Debt To Pay
              </td>
              <td className="text-gray-700 text-start py-2 px-3">
                ${debtToPay}
              </td>
            </tr>
            <tr className="border-b border-[#d3d2d2]">
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
    </div>
  );
};

// /pages/index.jsx
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import { useBackendDataStore } from '../../Store Management/useBackendDataStore';
import DefaultLayout from '../../layout/DefaultLayout';
import Header from './components/Header/index';
import { useNavigate } from 'react-router-dom';
import { deleteDebt } from '../../libs/deleteApis';
import { getAllDebts } from '../../libs/getApis';

const Debts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const { debts } = useBackendDataStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <div className="flex justify-center flex-wrap">
        {debts?.length > 0 ? (
          <>
            {debts?.map((item, index) => (
              <>
                {' '}
                {item?.lists
                  ?.slice()
                  .reverse()
                  .map((debt, index) => (
                    <Card
                      key={index}
                      debtName={debt.debtName}
                      category={debt.category}
                      debtPaid={debt.debtPaid}
                      debtToPay={debt.debtToPay}
                      leftToSave={debt.leftToSave}
                      debtId={debt._id}
                    />
                  ))}
              </>
            ))}
          </>
        ) : (
          <h3 className=" text-black text-center my-24">No Debts</h3>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Debts;
