import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
import TopTwoCards from './components/TopTwoCards';
import ClassificationTable from './components/ClassificationTable';
import AddCategoryModal from './components/AddCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';
const Savings = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isAOpen, setIsAOpen] = useState(false);
  const [isEOpen, setIsEOpen] = useState(false);
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <AddCategoryModal isAOpen={isAOpen} setIsAOpen={setIsAOpen} />
      <EditCategoryModal isEOpen={isEOpen} setIsEOpen={setIsEOpen} />
      <TopTwoCards />
      <ClassificationTable
        isAOpen={isAOpen}
        setIsAOpen={setIsAOpen}
        isEOpen={isEOpen}
        setIsEOpen={setIsEOpen}
      />
    </DefaultLayout>
  );
};

export default Savings;
