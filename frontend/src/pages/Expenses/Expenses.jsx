import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Header from './components/Header';
import WeeklyComparison from './components/WeeklyComparison';
import ExpenseBreakdown from './components/ExpenseBreakdown';
import AnalyticsReport from './components/AnalyticsReport';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import AddExpenseModal from '../Dashboard/components/AddExpenseModal';
const Expenses = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isAEOpen,setIsAEOpen]=useState(false)
  return (
    <DefaultLayout>
      <Header isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <AddExpenseModal isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen}/>
      <div className="flex flex-col gap-10 mt-6 text-lg font-medium">
        <WeeklyComparison />
        <AnalyticsReport />
        <ExpenseBreakdown />
      </div>
    </DefaultLayout>
  );
};

export default Expenses;
