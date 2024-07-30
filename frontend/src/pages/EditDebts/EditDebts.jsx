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
import { getAllDebts } from '../../libs/getApis';

const EditDebts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { prevDN, prevC, prevdebtPaid, prevdebtToPay, prevleftToSave, id } =
    location.state || {};
  // Deep copy of prevP to initialize payments
  const { debts, updateAllDebts } = useBackendDataStore();
  const [debtName, setDebtName] = useState(prevDN);
  const [category, setCategory] = useState(prevC);
  const [debtPaid, setDebtPaid] = useState(prevdebtPaid);
  const [debtToPay, setDebtToPay] = useState(prevdebtToPay);
  const [leftToSave, setLeftToSave] = useState(prevleftToSave);
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

  const handleSave = async () => {
    let validationErrors = {};
    const isDebtNameChanged = debtName !== prevDN;
    const isCategoryChanged = category !== prevC;
    const isDebtPaid = debtPaid !== prevdebtPaid;
    const isDebtToPay = debtToPay !== prevdebtToPay;
    const isLeftToSave = leftToSave !== prevleftToSave;
    if (!debtName) validationErrors.debtName = 'Debt Name is required';
    if (!category) validationErrors.category = 'Category is required';
    // Validate debtPaid
    if (!debtPaid) {
      validationErrors.debtPaid = 'Amount paid towards debt is required';
    } else if (isNaN(debtPaid)) {
      validationErrors.debtPaid = 'Amount paid must be a number';
    } else if (parseFloat(debtPaid) <= 0) {
      validationErrors.debtPaid = 'Amount paid must be greater than 0';
    }

    // Validate debtToPay
    if (!debtToPay) {
      validationErrors.debtToPay = 'Debt amount to pay is required';
    } else if (isNaN(debtToPay)) {
      validationErrors.debtToPay = 'Debt amount to pay must be a number';
    } else if (parseFloat(debtToPay) <= 0) {
      validationErrors.debtToPay = 'Debt amount to pay must be greater than 0';
    }

    // Validate leftToSave
    if (!leftToSave) {
      validationErrors.leftToSave = 'Amount left to save is required';
    } else if (isNaN(leftToSave)) {
      validationErrors.leftToSave = 'Amount left to save must be a number';
    } else if (parseFloat(leftToSave) <= 0) {
      validationErrors.leftToSave =
        'Amount left to save must be greater than 0';
    }
    if (
      !isDebtNameChanged &&
      !isCategoryChanged &&
      !isDebtPaid &&
      !isDebtToPay &&
      !isLeftToSave
    ) {
      validationErrors.general = 'At least one value must be changed';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const result = await updateDebt(id, {
        debtName,
        category,
        debtPaid,
        debtToPay,
        leftToSave,
      });
      if (result) {
        console.log('Debt updated successfully', result);
        const fetchedDebts = await getAllDebts();
        updateAllDebts(fetchedDebts || []);
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
            <div className="grid grid-cols-2 w-[100%] gap-5 relative">
              <div className="flex flex-col gap-2 w-[100%]">
                <label className="text-[#808080] font-medium">Debt Paid</label>
                <input
                  type="text"
                  name="name"
                  value={debtPaid}
                  onChange={(event) => setDebtPaid(event.target.value)}
                  placeholder="Amount"
                  className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                />
                {errors.debtPaid && (
                  <p className="text-red-500 text-sm">{errors.debtPaid}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[100%]">
                <label className="text-[#808080] font-medium">
                  Debt To Pay
                </label>
                <input
                  type="text"
                  name="name"
                  value={debtToPay}
                  onChange={(event) => setDebtToPay(event.target.value)}
                  placeholder="Amount"
                  className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                />
                {errors.debtToPay && (
                  <p className="text-red-500 text-sm">{errors.debtToPay}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[100%]">
                <label className="text-[#808080] font-medium">
                  Left To Save
                </label>
                <input
                  type="text"
                  name="name"
                  value={leftToSave}
                  onChange={(event) => setLeftToSave(event.target.value)}
                  placeholder="Amount"
                  className="pl-3 py-2 bg-transparent outline-none border text-black border-[#DBD7D7] rounded-md pr-3 w-[100%]"
                />
                {errors.leftToSave && (
                  <p className="text-red-500 text-sm">{errors.leftToSave}</p>
                )}
              </div>
            </div>
          </div>
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
