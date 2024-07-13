import React from 'react';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
import { deleteSaving } from '../../../libs/deleteApis';
import { useNavigate } from 'react-router-dom';

const ClassificationTable = ({ isAOpen, setIsAOpen, isEOpen, setIsEOpen }) => {
  const { savings, updateAllSavings } = useBackendDataStore();
  console.log(savings)
  const navigate = useNavigate();
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
  const handleDeleteSaving = async (id) => {
    try {
      const result = await deleteSaving(id);
      if (result) {
        console.log('Saving deleted successfully', result);

        // Find index of the deleted saving in the savings array
        const index = savings.findIndex((saving) => saving._id === result._id);

        if (index !== -1) {
          // Create a new array without the deleted saving
          const updatedSavings = [
            ...savings.slice(0, index),
            ...savings.slice(index + 1),
          ];
          updateAllSavings(updatedSavings); // Update the savings state with the updated array
        } else {
          console.warn('Deleted saving not found in the savings array');
        }
      }
    } catch (error) {
      console.error('Error deleting saving', error);
      // Handle error state or feedback to the user
    }
  };
  return (
    <div className="container text-black mx-auto p-4">
      <div className="flex justify-between flex-col gap-3 sm:flex-row sm:items-center mb-4">
        <h2 className="text-2xl font-semibold">Classification Table</h2>
        <button
          onClick={() => setIsAOpen(!isAOpen)}
          className="bg-[#71299d] self-end text-white px-4 py-2 rounded-full"
        >
          + Add New Category
        </button>
      </div>
      <div className="overflow-x-auto">
        {savings?.length > 0 ? (
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
              {savings?.map((saving, index) => (
                <tr key={index} className="border-b border-[#e8e7e7]">
                  <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-5 font-semibold text-[#000] px-4">
                    {saving.category}
                  </td>
                  <td className="py-5 font-semibold text-[#000] px-4">
                    ${saving.accumulatedAmount}
                  </td>
                  <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                    {saving.annualVariation}%
                  </td>
                  <td className="py-5 font-semibold text-[#a4a4a4] px-4">
                    {saving.monthlyVariation}%
                  </td>
                  <td className="py-5 flex gap-2 font-semibold text-[#a4a4a4] px-4">
                    <img
                      onClick={() => setIsEOpen(saving)}
                      className=" cursor-pointer"
                      src="/images/icon/icon-gray-edit.svg"
                    />
                    <img
                      className=" cursor-pointer"
                      onClick={() => handleDeleteSaving(saving._id)}
                      src="/images/icon/icon-gray-delete.svg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className=" text-center w-full my-8">No Savings</h3>
        )}
      </div>
    </div>
  );
};

export default ClassificationTable;
