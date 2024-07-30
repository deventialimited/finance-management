import React, { useState } from 'react';
import Housing from '/public/images/icon/icon-housing.svg';
import Food from '/public/images/icon/icon-food.svg';
import Transportation from '/public/images/icon/icon-transportation.svg';
import Entertainment from '/public/images/icon/icon-entertainment.svg';
import Shopping from '/public/images/icon/icon-shopping.svg';
import Others from '/public/images/icon/icon-others.svg';
import ExpenseBreakdown from './ExpenseBreakdown';
import AllBreakdown from './AllBreakdown';
import SavingsBreakdown from './SavingsBreakdown';
import RevenuesBreakdown from './RevenuesBreakdown';
import DebtsBreakdown from './DebtsBreakdown';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
const RecentTransactions = () => {
  const [tabType, setTabType] = useState('all');
  const { savings, expenses, revenues, debts } = useBackendDataStore();
  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-GB',
      options,
    );

    // Extracting day, month, and year
    const dateObj = new Date(dateString);
    const day = dateObj.toLocaleString('en-GB', { day: '2-digit' });
    const month = dateObj.toLocaleString('en-GB', { month: 'short' });
    const year = dateObj.toLocaleString('en-GB', { year: 'numeric' });

    // Combining into desired format
    return `${day} ${month}, ${year}`;
  };

  const Icons = {
    Housing,
    Food,
    Transportation,
    Entertainment,
    Shopping,
    Others,
  };
  return (
    <div className="w-full h-full flex flex-col sm:p-6 text-[#7c7c80]">
      <h2 className="text-2xl mb-4">Recent Transactions</h2>
      <div className="flex gap-3 items-center mb-4">
        <button
          onClick={() => setTabType('all')}
          className={`font-semibold ${
            tabType === 'all'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-500'
          }  pb-2`}
        >
          All
        </button>
        <button
          onClick={() => setTabType('revenues')}
          className={`font-semibold ${
            tabType === 'revenues'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-500'
          } pb-2`}
        >
          Revenue
        </button>
        <button
          onClick={() => setTabType('savings')}
          className={`font-semibold ${
            tabType === 'savings'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-500'
          } pb-2`}
        >
          Savings
        </button>
        <button
          onClick={() => setTabType('debts')}
          className={`font-semibold ${
            tabType === 'debts'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-500'
          } pb-2`}
        >
          Debts
        </button>
        <button
          onClick={() => setTabType('expenses')}
          className={`font-semibold ${
            tabType === 'expenses'
              ? 'text-purple-500 border-b-2 border-purple-500'
              : 'text-gray-500'
          } pb-2`}
        >
          Expenses
        </button>
      </div>
      {tabType === 'all' && (
        <AllBreakdown
          expenses={expenses}
          debts={debts}
          savings={savings}
          revenues={revenues}
        />
      )}
      {tabType === 'revenues' && <RevenuesBreakdown revenues={revenues} />}
      {tabType === 'savings' && <SavingsBreakdown savings={savings} />}
      {tabType === 'debts' && <DebtsBreakdown debts={debts} />}
      {tabType === 'expenses' && <ExpenseBreakdown expenses={expenses} />}
    </div>
  );
};

export default RecentTransactions;
