import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Statistics from './components/Statistics';
import TotalExpenses from './components/TotalExpenses';
import RadialChart from './components/RadialChart';
import Header from './components/Header/index';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import ExpensesAnalyticsReport from './components/ExpensesAnalyticsReport';
import DebtsAnalyticsReport from './components/DebtsAnalyticsReport';
import { useBackendDataStore } from '../../Store Management/useBackendDataStore';
const TotalNetworth = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const { debts } = useBackendDataStore();
  return (
    <DefaultLayout>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className=" flex lg:flex-row flex-col mt-6 gap-4">
        <div className="lg:w-[55%] p-2 border border-[#E6E9EE] rounded-xl shadow-md">
          <h2 className="text-2xl text-black font-semibold">
            Total Yearly Expenses
          </h2>
          <ExpensesAnalyticsReport />
        </div>
        <div className="lg:w-[45%] border-[#E6E9EE] border shadow-md rounded-xl">
          <TotalExpenses />
        </div>
      </div>
      <div className=" flex lg:flex-row flex-col gap-5 mt-6">
        <div className="lg:w-[55%] p-2 border border-[#E6E9EE] shadow-md rounded-xl">
          {' '}
          <h2 className="text-2xl text-black font-semibold">Total Debts</h2>
          <DebtsAnalyticsReport />
        </div>
        {debts?.length > 0 && (
          <div className="lg:w-[45%] border border-[#E6E9EE] shadow-md rounded-xl">
            <RadialChart />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TotalNetworth;
