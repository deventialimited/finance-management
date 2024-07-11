import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TopThreeCards from './components/TopThreeCards';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
import MoneyFlow from './components/MoneyFlow';
const Revenues = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <TopThreeCards />
      <MoneyFlow/>
    </DefaultLayout>
  );
};

export default Revenues;
