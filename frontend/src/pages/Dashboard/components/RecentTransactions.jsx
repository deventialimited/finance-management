import React from 'react';
import Housing from '/public/images/icon/icon-housing.svg';
import Food from '/public/images/icon/icon-food.svg';
import Transportation from '/public/images/icon/icon-transportation.svg';
import Entertainment from '/public/images/icon/icon-entertainment.svg';
import Shopping from '/public/images/icon/icon-shopping.svg';
import Others from '/public/images/icon/icon-others.svg';
const RecentTransactions = () => {
  const transactions = [
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
    },
    {
      _id: '668f752d769834feb08ed843',

      transactionName: 'GTR 5',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-11T00:00:00.000Z',

      __v: 0,
    },

    {
      _id: '668f8eab52ba6e797321e42a',

      transactionName: 'GTR 4',

      category: 'Entertainment',

      amount: 245,

      transactionDate: '2024-07-12T00:00:00.000Z',

      __v: 0,
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

  const Icons = {
    Housing,
    Food,
    Transportation,
    Entertainment,
    Shopping,
    Others,
  };
  return (
    <div className="w-full h-full flex flex-col text-[#7c7c80]">
      <h2 className="text-2xl mb-4">Recent Transactions</h2>
      <div className="bg-white flex-1 rounded-lg shadow p-4">
        {/* <div className="flex justify-between mb-4">
          <button className="font-semibold text-purple-500 border-b-2 border-purple-500 pb-2">
            All
          </button>
          <button className="font-semibold text-gray-500 pb-2">Revenue</button>
          <button className="font-semibold text-gray-500 pb-2">Expenses</button>
        </div> */}
        <div className="overflow-y-auto">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center gap-3 justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <div className=" bg-[#f3f3f3] flex flex-col h-full w-10 justify-center items-center mr-4 px-2 py-3 rounded-full">
                  <img src={Icons[transaction.category]} alt="icon" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {transaction.transactionName}
                  </p>
                  <p className="text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ${transaction.amount}
                </p>
                <p className="text-gray-500 text-sm">
                  {formatDate(transaction.transactionDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
