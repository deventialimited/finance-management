import React, {  useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RecentTransactions from "./components/RecentTransactions"
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
import AddExpenseModal from "./components/AddExpenseModal"
const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [isAEOpen,setIsAEOpen]=useState(false)
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <AddExpenseModal isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen}/>
      <RecentTransactions/>
      {/* <div className=" mt-8 grid gap-3 grid-cols-10">
      <div className=" col-span-10 md:col-span-4 h-full flex flex-col gap-3">
        <RecentTransactions transactions={transactions}/>
      </div>
      <div className=" col-span-10 md:col-span-6 h-full flex gap-3 flex-col">
        <ExpenseBreakdown expenses={expenses}/>
      </div>
    </div> */}
    </DefaultLayout>
  );
};

export default Dashboard;
