import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import MoneyFlow from './components/MoneyFlow';
import Header from '../Dashboard/components/Header';
import AddExpenseModal from '../Dashboard/components/AddExpenseModal';
import RevenueBreakdown from './components/RevenueBreakdown';
import WeeklyComparison from './components/WeeklyComparison';
const Revenues = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isAEOpen, setIsAEOpen] = useState(false);

  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header
        isAEOpen={isAEOpen}
        setIsAEOpen={setIsAEOpen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* <!-- ===== Header End ===== --> */}
      <AddExpenseModal isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} />

      <WeeklyComparison />
      <MoneyFlow />
      <RevenueBreakdown />
    </DefaultLayout>
  );
};

export default Revenues;
