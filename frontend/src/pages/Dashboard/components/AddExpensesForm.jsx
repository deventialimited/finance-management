import React, { useState } from 'react';
import { addExpense } from '../../../libs/postApis';
import { getAllExpenses } from '../../../libs/getApis';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';
const Dropdown = ({ label, options, placeholder, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <h3 className="block font-medium">{label}</h3>
      <button
        className={`w-full border flex justify-between items-center border-[#adadad] bg-white rounded-md py-2 px-4 text-left`}
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
const AddExpensesForm = ({ isAEOpen, setIsAEOpen }) => {
  const { updateAllExpenses, expenses } = useBackendDataStore();
  const [formData, setFormData] = useState({
    expenseName: '',
    category: '',
    amount: '',
    expenseDate: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDropdownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validate = () => {
    const errors = {};
    if (!formData.expenseName) errors.expenseName = 'Expense Name is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }

    if (!formData.expenseDate) errors.expenseDate = 'Expense Date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      const result = await addExpense(formData);
      if (result) {
        console.log('Expense added successfully', result);
        // Reset form or show success message
        const fetchedExpenses = await getAllExpenses();
        console.log(fetchedExpenses);
        updateAllExpenses(fetchedExpenses || []);
        setFormData({
          expenseName: '',
          category: '',
          amount: '',
          expenseDate: '',
        });
        setIsAEOpen(!isAEOpen);
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
    <form onSubmit={handleSubmit} className="space-y-4 mt-12 text-[#767576]">
      <div>
        <label className="block font-medium">Expense Name</label>
        <input
          type="text"
          name="expenseName"
          value={formData.expenseName}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.expenseName && (
          <p className="text-red-500 text-sm">{errors.expenseName}</p>
        )}
      </div>
      <div>
        <Dropdown
          label="Category"
          placeholder="Select an option"
          options={categoryOptions}
          selected={formData.category}
          onChange={(value) => handleDropdownChange('category', value)}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Amount</label>
        <input
          type="Number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Expense Date</label>
        <input
          type="date"
          name="expenseDate"
          value={formData.expenseDate}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.expenseDate && (
          <p className="text-red-500 text-sm">{errors.expenseDate}</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setIsAEOpen(!isAEOpen)}
          className=" text-black border py-2 sm:py-3 font-semibold px-6 sm:px-8 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#71299d] text-white py-2 sm:py-3 font-semibold px-6 sm:px-8 rounded-full"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddExpensesForm;
