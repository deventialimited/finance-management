import React from 'react';
import DonutChart from './DonutChart';
const TotalExpenses = () => {
  return (
    <div className=" p-4">
      <h2 className="text-2xl text-black font-semibold">Total Expenses</h2>
      <div className="flex items-center justify-between text-lg font-medium">
        <div>
          <div>Daily</div>
          <div className="text-black font-medium">$475</div>
        </div>
        <div>
          <div>Weekly</div>
          <div className="text-black font-medium">$3,327</div>
        </div>
        <div>
          <div>Monthly</div>
          <div className="text-black font-medium">$12.131</div>
        </div>
      </div>
      <DonutChart />
    </div>
  );
};

export default TotalExpenses;
