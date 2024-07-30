import React from 'react';
import { Link } from 'react-router-dom';

const getArrow = (change) => {
  return change === 'up' ? '↑' : '↓';
};

const Card = ({ category, amount, percentage, change, color, icon }) => (
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
    <Link to={'/savings'}>
      <span className="text-2xl " style={{ color: color }}>
        →
      </span>
    </Link>
  </div>
);

const SavingsBreakdown = ({ savings }) => {
  console.log(savings)
  return (
    <div className="">
      <div className="flex mb-4 flex-col sm:flex-row text-[#7c7c80] sm:items-center justify-between">
        <h2 className="text-2xl ">Savings Breakdown</h2>
        <p className=" text-sm mt-4 self-end">*Compare to last month</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 shadow rounded-lg gap-4">
        {savings?.length > 0 ? (
          <>
            {savings.map((saving, index) => (
              <Card
                key={index}
                category={saving.category}
                amount={saving.accumulatedAmount}
                percentage={parseInt(saving.percentage)}
                change={parseInt(saving.percentage) >= 10 ? 'up' : 'down'}
                color={saving.color}
                icon={saving.icon}
              />
            ))}
          </>
        ) : (
          <h3 className=" text-center my-4 col-span-2 text-black">
            No savings
          </h3>
        )}
      </div>
    </div>
  );
};

export default SavingsBreakdown;
