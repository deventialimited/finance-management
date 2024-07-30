import React, { useState } from 'react';
import BillsForm from './SavingsForm';
import AddExpensesForm from './AddExpensesForm';
import RevenuesForm from './RevenuesForm';

const AddExpenses = ({ isAEOpen, setIsAEOpen }) => {
  const [selectedForm, setSelectedForm] = useState('revenues');

  return (
    <div className="p-2 sm:p-6">
      <div className="flex items-center justify-center sm:space-x-0 space-x-8 sm:justify-between flex-wrap mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="revenues"
            name="formType"
            value="revenues"
            checked={selectedForm === 'revenues'}
            onChange={() => setSelectedForm('revenues')}
            className="mr-2 relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[#adadad] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#71299d] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-[#71299d] checked:after:bg-[#71299d] checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-[#71299d] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-[#71299d]"
          />
          <label
            htmlFor="revenues"
            className=" font-semibold text-black text-xl"
          >
            Revenues
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="savings"
            name="formType"
            value="savings"
            checked={selectedForm === 'savings'}
            onChange={() => setSelectedForm('savings')}
            className="mr-2 relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[#adadad] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#71299d] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-[#71299d] checked:after:bg-[#71299d] checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-[#71299d] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-[#71299d]"
          />
          <label
            htmlFor="savings"
            className=" font-semibold text-black text-xl"
          >
            Savings
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="addExpenses"
            name="formType"
            value="addExpenses"
            checked={selectedForm === 'addExpenses'}
            onChange={() => setSelectedForm('addExpenses')}
            className="mr-2 relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[#adadad] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#71299d] checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-[#71299d] checked:after:bg-[#71299d] checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-[#71299d] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-[#71299d]"
          />
          <label
            htmlFor="addExpenses"
            className="font-semibold text-black text-xl"
          >
            Expenses
          </label>
        </div>
      </div>

      {selectedForm === 'revenues' && (
        <RevenuesForm isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} />
      )}
      {selectedForm === 'savings' && (
        <BillsForm isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} />
      )}
      {selectedForm === 'addExpenses' && (
        <AddExpensesForm isAEOpen={isAEOpen} setIsAEOpen={setIsAEOpen} />
      )}
    </div>
  );
};

export default AddExpenses;
