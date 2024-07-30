import React, { useMemo } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Header from './components/Header/index';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import ExpensesAnalyticsReport from './components/ExpensesAnalyticsReport';
import RevenuesAnalyticsReport from './components/RevenuesAnalyticsReport';
import SavingsAnalyticsReport from './components/SavingsAnalyticsReport';
import DebtsAnalyticsReport from './components/DebtsAnalyticsReport';
import { useBackendDataStore } from '../../Store Management/useBackendDataStore';

const TotalNetworth = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const { debts, expenses, savings, revenues } = useBackendDataStore();

  // Compute the total net worth
  const totalNetWorth = useMemo(() => {
    // Calculate total revenues and savings
    const totalRevenuesAndSavings =
      revenues.reduce((acc, curr) => acc + curr.amount, 0) +
      savings.reduce((acc, curr) => acc + curr.accumulatedAmount, 0);

    // Calculate total expenses and debts
    const totalExpensesAndDebts =
      expenses.reduce((acc, curr) => acc + curr.amount, 0) +
      debts.reduce((acc, curr) => acc + curr.debtPaid, 0);

    // Calculate net worth by subtracting total expenses and debts from total revenues and savings
    return totalRevenuesAndSavings - totalExpensesAndDebts;
  }, [debts, expenses, savings, revenues]);

  return (
    <DefaultLayout>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col mt-6 sm:flex-row gap-4 sm:gap-8 items-center">
        <h2 className="text-2xl text-[#71299d] font-semibold">
          Total Net Worth
        </h2>
        <h3 className="text-black font-bold flex items-center flex-col text-2xl">
          $
          {totalNetWorth.toLocaleString('en-US', {
            style: 'decimal',
            maximumFractionDigits: 2,
          })}
        </h3>
      </div>
      <ExpensesAnalyticsReport />
      <RevenuesAnalyticsReport />
      <SavingsAnalyticsReport />
      <DebtsAnalyticsReport />
    </DefaultLayout>
  );
};

export default TotalNetworth;
