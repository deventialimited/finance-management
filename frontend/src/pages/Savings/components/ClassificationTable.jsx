import React from 'react';

const ClassificationTable = ({ isOpen, setIsOpen }) => {
  const data = [
    {
      category: 'Savings Account',
      amount: '$10,000',
      annual: '+5%',
      monthly: '+2%',
    },
    {
      category: 'Money Market Account',
      amount: '$20,000',
      annual: '+8%',
      monthly: '-3%',
    },
    {
      category: 'Certificate of Deposit',
      amount: '$30,000',
      annual: '-2%',
      monthly: '+1%',
    },
    { category: 'Stocks', amount: '$40,000', annual: '+12%', monthly: '+5%' },
    { category: 'Bonds', amount: '$50,000', annual: '-5%', monthly: '-2%' },
  ];

  return (
    <div className="container text-black mx-auto p-4">
      <div className="flex justify-between flex-col gap-3 sm:flex-row sm:items-center mb-4">
        <h2 className="text-2xl font-semibold">Classification Table</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#71299d] self-end text-white px-4 py-2 rounded-full"
        >
          + Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md border-[#e8e7e7]">
          <thead>
            <tr className="bg-[#eadff0]">
              <th className="w-10 py-2 px-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Accumulated Amount</th>
              <th className="py-2 px-4 text-left">Annual % Variation</th>
              <th className="py-2 px-4 text-left">Monthly % Variation</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-[#e8e7e7]">
                <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                  <input type="checkbox" />
                </td>
                <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                  {item.category}
                </td>
                <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                  {item.amount}
                </td>
                <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                  {item.annual}
                </td>
                <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                  {item.monthly}
                </td>
                <td className="py-5 flex gap-2 font-semibold text-[#a4a4a4] px-4">
                  <img src="/images/icon/icon-gray-edit.svg" />
                  <img src="/images/icon/icon-gray-delete.svg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificationTable;
