import React from 'react';
import Breakdown from './Breakdown';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
const ExpenseBreakdown = () => {
  const { expenses } = useBackendDataStore();
  return (
    <div>
      <h2 className="text-2xl mb-4 text-[#7c7c80]">ExpenseBreakdown</h2>

      {expenses?.length > 0 ? (
        <Breakdown />
      ) : (
        <h3 className=" text-center my-6 text-black">No Graph Data</h3>
      )}
    </div>
  );
};

export default ExpenseBreakdown;
