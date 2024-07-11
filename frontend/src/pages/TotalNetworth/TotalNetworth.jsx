import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Statistics from './components/Statistics';
import AnalyticsReport from './components/AnalyticsReport';
import TotalExpenses from './components/TotalExpenses';
import RadialChart from './components/RadialChart';
import Header from './components/Header/index';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
const TotalNetworth = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <DefaultLayout>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Statistics />
      <div className=" flex lg:flex-row flex-col mt-6 gap-4">
        <div className="lg:w-[55%] p-2 border border-[#E6E9EE] rounded-xl shadow-md">
          <h2 className="text-2xl text-black font-semibold">Total Expenses</h2>
          <AnalyticsReport />
        </div>
        <div className="lg:w-[45%] border-[#E6E9EE] border shadow-md rounded-xl">
          <TotalExpenses />
        </div>
      </div>
      <div className=" flex lg:flex-row flex-col gap-5 mt-6">
        <div className="lg:w-[55%] p-2 border border-[#E6E9EE] shadow-md rounded-xl">
          {' '}
          <h2 className="text-2xl text-black font-semibold">Total Debts</h2>
          <AnalyticsReport />
        </div>
        <div className="lg:w-[45%] border border-[#E6E9EE] shadow-md rounded-xl">
          <RadialChart />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TotalNetworth;
