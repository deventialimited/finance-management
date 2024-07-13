import React, { useState } from 'react';
import { addBill } from '../../../libs/postApis';
import { useBackendDataStore } from '../../../Store Management/useBackendDataStore';

const BillsForm = ({ isAEOpen, setIsAEOpen }) => {
  const { bills, updateAllBills } = useBackendDataStore();
  const [formData, setFormData] = useState({
    billName: '',
    billType: '',
    amount: '',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.billName) errors.billName = 'Bill Name is required';
    if (!formData.billType) errors.billType = 'BillType is required';
    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }
    if (!formData.dueDate) errors.dueDate = 'Due Date is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Form data:', formData);
      const result = await addBill(formData);
      if (result) {
        console.log('Bill added successfully', result);
        // Reset form or show success message
        bills ? updateAllBills([...bills, result]) : updateAllBills([result]);
        setFormData({
          billName: '',
          billType: '',
          amount: '',
          dueDate: '',
        });
        setIsAEOpen(!isAEOpen);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-12 text-[#767576]">
      <div>
        <label className="block font-medium">Bill Name</label>
        <input
          type="text"
          name="billName"
          value={formData.billName}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.billName && (
          <p className="text-red-500 text-sm">{errors.billName}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Bill Type</label>

        <input
          type="text"
          name="billType"
          value={formData.billType}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.billType && (
          <p className="text-red-500 text-sm">{errors.billType}</p>
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
        <label className="block font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border border-[#adadad] rounded-lg p-2 outline-none"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">{errors.dueDate}</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setIsAEOpen(!isAEOpen)}
          className=" text-black border py-2 sm:py-3 px-6 font-semibold sm:px-8 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#71299d] text-white py-2 sm:py-3 px-6 font-semibold sm:px-8 rounded-full"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default BillsForm;
