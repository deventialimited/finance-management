import React, {  useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TopThreeCards from './components/TopThreeCards';
import RecentTransactions from "./components/RecentTransactions"
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import {useBackendDataStore} from '../../Store Management/useBackendDataStore'
import Statistics from "./components/Statistics"
import Header from './components/Header';
import ExpenseBreakdown from "./components/ExpenseBreakdown"
import AddExpenseModal from "./components/AddExpenseModal"
const Dashboard = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
 const {bills,expenses,transactions}=useBackendDataStore()
  const [isAEOpen,setIsAEOpen]=useState(false)
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <AddExpenseModal isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen}/>
      <TopThreeCards bills={bills} />
      <div className=" mt-8 grid gap-3 grid-cols-10">
      <div className=" col-span-10 md:col-span-4 h-full flex flex-col gap-3">
        <RecentTransactions transactions={transactions}/>
      </div>
      <div className=" col-span-10 md:col-span-6 h-full flex gap-3 flex-col">
        <Statistics/>
        <ExpenseBreakdown expenses={expenses}/>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default Dashboard;
