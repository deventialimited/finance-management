import React from 'react';

const getArrow = (change) => {
  return change === 'up' ? '↑' : '↓';
};

const ExpensesCard = ({
  category,
  amount,
  percentage,
  change,
  color,
  icon,
}) => (
  <div className="flex justify-between text-[#7c7c80] items-center p-4 bg-white">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
        {/* Replace with appropriate icons */}
        <div className=" bg-[#f3f3f3] flex flex-col h-full w-10 justify-center items-center px-2 py-3 rounded-md">
          <img src={icon} />
        </div>
      </div>
      <div>
        <p className="text-gray-600">{category}</p>
        <p className="text-black text-lg font-semibold">${amount.toFixed(2)}</p>
        <p className="text-xs">
          {percentage}%*{' '}
          <span style={{ color: change === 'down' ? 'red' : 'green' }}>
            {' '}
            {getArrow(change)}
          </span>
        </p>
      </div>
    </div>
    <div>
      <span className="text-2xl " style={{ color: color }}>
        →
      </span>
    </div>
  </div>
);

const ExpensesBreakdown = ({ expenses }) => {
  return (
    <div className="sm:p-6">
      <div className="flex flex-col sm:flex-row text-[#7c7c80] sm:items-center justify-between">
        <h2 className="text-2xl ">Expenses Breakdown</h2>
        <p className=" text-sm mt-4 self-end">*Compare to last month</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 shadow rounded-lg gap-4">
        {expenses.map((expense, index) => (
          <ExpensesCard
            key={index}
            category={expense.category}
            amount={expense.amount}
            percentage={parseInt(expense.percentage)}
            change={parseInt(expense.percentage) >= 10 ? 'up' : 'down'}
            color={expense.color}
            icon={expense.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpensesBreakdown;
