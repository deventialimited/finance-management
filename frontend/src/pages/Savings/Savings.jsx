import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
import TopTwoCards from './components/TopTwoCards';
import ClassificationTable from './components/ClassificationTable';
import AddCategoryModal from './components/AddCategoryModal';
const Savings = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <AddCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <TopTwoCards />
      <ClassificationTable isOpen={isOpen} setIsOpen={setIsOpen} />
    </DefaultLayout>
  );
};

export default Savings;
