// /components/AddDebts.jsx
import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import Header from './components/Header';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import { addDebt } from '../../libs/postApis';
import { useBackendDataStore } from '../../Store Management/useBackendDataStore';
import { getAllDebts } from '../../libs/getApis';
const Dropdown = ({ label, options, placeholder, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <h3 className="block font-medium mb-2 text-[#808080]">{label}</h3>
      <button
        className={`pl-3 py-2 flex justify-between items-center bg-transparent outline-none border  border-[#DBD7D7] rounded-md pr-3 w-[100%]`}
        onClick={(e) => onToggleDropdown(e)}
      >
        {selected ? selected : placeholder}
        <img
          src="/images/icon/icon-arrow-down.svg"
          className={`${
            isOpen ? 'rotate-180' : null
          } transition-all duration-200 ease-in-out`}
        />
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white border border-[#adadad] rounded-md mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const AddDebts = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const { debts, updateAllDebts } = useBackendDataStore();
  const [debtName, setDebtName] = useState('');
  const [category, setCategory] = useState('');
  const [debtPaid, setDebtPaid] = useState('');
  const [debtToPay, setDebtToPay] = useState('');
  const [leftToSave, setLeftToSave] = useState('');
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    let validationErrors = {};
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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Save logic here
      console.log('Form Data:', {
        debtName,
        category,
        debtPaid,
        debtToPay,
        leftToSave,
      });
      const result = await addDebt({
        debtName,
        category,
        debtPaid,
        debtToPay,
        leftToSave,
      });
      if (result) {
        console.log('Debt added successfully', result);
        // Reset form or show success message
        const fetchedDebts = await getAllDebts();
        updateAllDebts(fetchedDebts || []);
        setDebtName('');
        setCategory('');
        setDebtPaid('');
        setDebtToPay('');
        setLeftToSave('');
      }
    }
  };
  const categoryOptions = [
    'Housing',
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Others',
  ];
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
                <Dropdown
                  label="Category"
                  placeholder="Select an option"
                  options={categoryOptions}
                  selected={category}
                  onChange={(value) => setCategory(value)}
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
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
