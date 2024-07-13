// /components/DonutChart.jsx
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
const DonutChart = ({ payments }) => {
  const chartOptions = {
    series: payments?.map((payment) => parseFloat(payment.amount)),
    options: {
      chart: {
        type: 'donut',
      },
      labels: payments?.map((payment) => payment.name),
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
const Card = ({ debtName, category, payments, debtId }) => {
  const { debts, updateAllDebts } = useBackendDataStore();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const displayedPayments = showAll ? payments : payments.slice(0, 3);
  const handleDeleteDebt = async (id) => {
    try {
      const result = await deleteDebt(id);
      if (result) {
        console.log('Debt deleted successfully', result);
        // Handle state update or any other action after successful deletion
        // Find index of the deleted debt in the debts array
        const index = debts.findIndex((debt) => debt._id === result._id);

        if (index !== -1) {
          // Create a new array without the deleted debt
          const updatedDebts = [
            ...debts.slice(0, index),
            ...debts.slice(index + 1),
          ];
          updateAllDebts(updatedDebts); // Update the debts state with the updated array
        } else {
          console.warn('Deleted debt not found in the debts array');
        }
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
                  prevP: payments,
                  id: debtId,
                },
              })
            }
            src="/public/images/icon/icon-gray-edit.svg"
            alt="Edit"
            className=" cursor-pointer"
          />
          <img
            onClick={() => handleDeleteDebt(debtId)}
            className=" cursor-pointer"
            src="/public/images/icon/icon-gray-delete.svg"
            alt="Delete"
          />
        </div>
      </div>
      <h2 className="text-sm font-semibold text-black text-center bg-[#e9d7f4] rounded-md px-4 py-3 mb-4">
        {debtName}
      </h2>
      <DonutChart payments={payments} />
      <div className="mt-4 text-[#777777]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f0f0f0]">
              <th className="text-black text-start py-2 px-3">Debts</th>
              <th className="text-black text-start py-2 px-3">$</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, idx) => (
              <tr key={idx} className="border-b border-[#d3d2d2]">
                <td className="text-gray-700 text-start py-2 px-3">
                  {payment.name}
                </td>
                <td className="text-gray-700 text-start py-2 px-3">
                  ${payment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {payments.length > 3 && (
        <div className="flex justify-center items-center">
          <button
            className="text-black border-2 font-semibold w-max rounded-full py-2 px-4 mt-4"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
      )}
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
  const { debts } = useBackendDataStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <div className="flex justify-center flex-wrap">
        {debts?.length > 0 ? (
          <>
            {' '}
            {debts?.map((debt, index) => (
              <Card
                key={index}
                debtName={debt.debtName}
                category={debt.category}
                payments={debt.payments}
                debtId={debt._id}
              />
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
