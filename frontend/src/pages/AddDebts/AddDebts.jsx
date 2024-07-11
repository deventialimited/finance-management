// /components/AddDebts.jsx
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import Header from './components/Header';
import { useSidebarStore } from '../../Store Management/useSidebarStore';

const AddDebts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const [debtName, setDebtName] = useState('');
  const [category, setCategory] = useState('');
  const [payments, setPayments] = useState([{ name: '', amount: '' }]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (index, event) => {
    const values = [...payments];
    if (event.target.name === 'name') {
      values[index].name = event.target.value;
    } else {
      values[index].amount = event.target.value;
    }
    setPayments(values);
  };

  const handleAddPayment = () => {
    setPayments([...payments, { name: '', amount: '' }]);
  };

  const handleRemovePayment = (index) => {
    const values = [...payments];
    values.splice(index, 1);
    setPayments(values);
  };

  const handleSave = () => {
    let validationErrors = {};
    if (!debtName) validationErrors.debtName = 'Debt Name is required';
    if (!category) validationErrors.category = 'Category is required';
    payments.forEach((payment, index) => {
      if (!payment.name) {
        validationErrors[`paymentName${index}`] = 'Payment Name is required';
      }
      if (!payment.amount) {
        validationErrors[`paymentAmount${index}`] = 'Amount is required';
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Save logic here
      console.log('Form Data:', { debtName, category, payments });
    }
  };

  return (
    <DefaultLayout>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl text-black font-semibold">Add New Debts</h1>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-black">
            Debts Information
          </h1>
          <div className="md:text-base text-sm gap-6 mt-6 flex flex-col justify-between">
            <div className="flex w-[100%] gap-5">
              <div className="flex flex-col gap-2 w-[100%]">
                <label className="text-[#808080] font-medium">Debt Name</label>
                <input
                  type="text"
                  value={debtName}
                  onChange={(e) => setDebtName(e.target.value)}
                  placeholder="Text input"
                  className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                />
                {errors.debtName && (
                  <p className="text-red-500">{errors.debtName}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[100%]">
                <label className="text-[#808080] font-medium">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Text input"
                  className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                />
                {errors.category && (
                  <p className="text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-black">
            Payments Details
          </h1>
          <div className="md:text-base text-sm gap-6 mt-6 flex flex-col justify-between">
            {payments.map((payment, index) => (
              <div
                key={index}
                className="grid grid-cols-2 w-[100%] gap-5 relative"
              >
                <div className="flex flex-col gap-2 w-[100%]">
                  <label className="text-[#808080] font-medium">
                    Payment Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={payment.name}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Text input"
                    className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                  />
                  {errors[`paymentName${index}`] && (
                    <p className="text-red-500">
                      {errors[`paymentName${index}`]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-[100%]">
                  <label className="text-[#808080] font-medium">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    value={payment.amount}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Text input"
                    className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                  />
                  {errors[`paymentAmount${index}`] && (
                    <p className="text-red-500">
                      {errors[`paymentAmount${index}`]}
                    </p>
                  )}
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePayment(index)}
                    className="absolute right-0 top-0 text-[#878787] p-1"
                  >
                    <IoIosClose size={24} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex cursor-pointer items-center gap-1 text-[#878787] font-medium"
          onClick={handleAddPayment}
        >
          <IoIosAdd size={20} />
          Add more
        </div>
        <div className="flex gap-5 mt-6">
          <button
            className="bg-[#71299D] text-white md:text-base text-xs rounded-3xl py-2 px-5 md:w-40 w-30"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddDebts;
