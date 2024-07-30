import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import TopTwoCards from './components/TopTwoCards';
import ClassificationTable from './components/ClassificationTable';
import AddCategoryModal from './components/AddCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';
import AddExpenseModal from '../Dashboard/components/AddExpenseModal';
import Header from '../Dashboard/components/Header';
const Savings = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isEOpen, setIsEOpen] = useState(false);
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
      <EditCategoryModal isEOpen={isEOpen} setIsEOpen={setIsEOpen} />
      <TopTwoCards />
      <ClassificationTable
        isEOpen={isEOpen}
        setIsEOpen={setIsEOpen}
      />
    </DefaultLayout>
  );
};

export default Savings;
