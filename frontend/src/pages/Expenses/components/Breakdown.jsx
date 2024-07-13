import React from 'react';
import { MdOutlineMapsHomeWork } from 'react-icons/md';
import { IoArrowDown } from 'react-icons/io5';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const data = [
  {
    id: 0,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
  {
    id: 1,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
  {
    id: 2,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
  {
    id: 3,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
  {
    id: 4,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
  {
    id: 5,
    name: 'Housing',
    amount: '$20,000',
    percentage: '12%*',
    month: 'last month',
    list: [
      { id: 0, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
      { id: 1, title: 'House Rent', price: '$12,500', date: '17 May 2023' },
    ],
  },
];
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
const getArrow = (change) => {
  return change >= 10 ? '↑' : '↓';
};
const Breakdown = () => {
  const { expenses } = useBackendDataStore();
  return (
    <div className=" flex flex-wrap text-[#7c7c80] items-start align-top flex-col sm:flex-row justify-center xl:gap-10 lg:gap-7 gap-5">
      {expenses.map((expense, index) => (
        <div key={index} className=" rounded-lg sm:w-[45%] w-full h-max shadow-lg  ">
          <div className="flex justify-between items-center border-b py-4 bg-[#FAFAFA] p-4 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className=" bg-[#f3f3f3] flex flex-col h-full w-10 justify-center items-center px-2 py-3 rounded-md">
                <img src={expense.icon} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-medium">{expense.category}</div>
                <div className="text-xl font-bold text-black">
                  ${expense.amount}
                </div>
              </div>
            </div>
            <div>
              <p className="text-md text-black font-semibold">
                {parseInt(expense.percentage)}%*{' '}
                <span
                  style={{
                    color: parseInt(expense.percentage) <= 10 ? 'red' : 'green',
                  }}
                >
                  {' '}
                  {getArrow(parseInt(expense.percentage))}
                </span>
              </p>
              <div className="text-sm">last month</div>
            </div>
          </div>
          <ul className="flex flex-col gap-4 mt-5 p-4 ">
            {expense.lists.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between text-black font-semibold"
              >
                <div>{item.expenseName}</div>
                <div>
                  <div>${item.amount}</div>
                  <div className="font-light text-sm">
                    {formatDate(item.expenseDate)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Breakdown;
