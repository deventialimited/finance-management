// /components/AddDebts.jsx
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import Header from './components/Header';
import { addDebt } from '../../libs/postApis';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import { useBackendDataStore } from '../../Store Management/useBackendDataStore';
import { updateDebt } from '../../libs/putApis';

const EditDebts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { prevDN, prevC, prevP, id } = location.state || {};
  // Deep copy of prevP to initialize payments
  const initialPayments = JSON.parse(JSON.stringify(prevP));
  const { debts, updateAllDebts } = useBackendDataStore();
  const [debtName, setDebtName] = useState(prevDN);
  const [category, setCategory] = useState(prevC);
  const [payments, setPayments] = useState(initialPayments);
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

  const handleSave = async () => {
    let validationErrors = {};
    const isDebtNameChanged = debtName !== prevDN;
    const isCategoryChanged = category !== prevC;
    const isPaymentsChanged =
      JSON.stringify(payments) !== JSON.stringify(prevP);

    if (!debtName) validationErrors.debtName = 'Debt Name is required';
    if (!category) validationErrors.category = 'Category is required';
    payments.forEach((payment, index) => {
      if (!payment.name) {
        validationErrors[`paymentName${index}`] = 'Payment Name is required';
      }
      if (!payment.amount) {
        validationErrors[`paymentAmount${index}`] = 'Amount is required';
      } else if (parseFloat(payment.amount) <= 0) {
        validationErrors[`paymentAmount${index}`] =
          'Amount must be greater than 0';
      }
    });

    if (!isDebtNameChanged && !isCategoryChanged && !isPaymentsChanged) {
      validationErrors.general = 'At least one value must be changed';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const result = await updateDebt(id, { debtName, category, payments });
      if (result) {
        console.log('Debt updated successfully', result);
        // Find index of the debt with the same _id in the debts array
        const index = debts.findIndex((debt) => debt._id === result._id);

        // If found, replace the debt at that index with the updated result
        if (index !== -1) {
          const updatedDebts = [...debts];
          updatedDebts.splice(index, 1, result); // Replace the debt at index with the updated result
          updateAllDebts(updatedDebts); // Update the debts state with the updated array
        } else {
          // If not found (though it should ideally be found), just add the result to debts
          updateAllDebts([...debts, result]);
        }

        navigate(-1); // Example of navigation after update
      }
    }
  };

  return (
    <DefaultLayout>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl text-black font-semibold">Edit Debts</h1>
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
                    type="Number"
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
        {errors.general && (
          <p className="text-red-500 text-center">{errors.general}</p>
        )}
        <div className="flex gap-5 mt-6">
          <button
            className="bg-[#71299D] text-white md:text-base text-xs rounded-3xl py-2 px-5 md:w-40 w-30"
            onClick={handleSave}
          >
            Update
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditDebts;
