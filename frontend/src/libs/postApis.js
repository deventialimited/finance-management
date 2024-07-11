import axios from 'axios';

const backend_base = 'http://localhost:4000'; // Replace with your backend base URL

export const addTransaction = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/transactions/addTransaction`,
      formData,
    );
    return response?.data?.transaction;
  } catch (error) {
    console.log('Error adding transaction', error);
  }
};

export const addBill = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/bills/addBill`,
      formData,
    );
    return response?.data?.bill;
  } catch (error) {
    console.log('Error adding bill', error);
  }
};

export const addExpense = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/expenses/addExpense`,
      formData,
    );
    return response?.data?.expense;
  } catch (error) {
    console.log('Error adding expense', error);
  }
};

export const addDebt = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/debts/addDebt`,
      formData,
    );
    return response?.data?.debt;
  } catch (error) {
    console.log('Error adding debt', error);
  }
};

export const addSaving = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/savings/addSaving`,
      formData,
    );
    return response?.data?.saving;
  } catch (error) {
    console.log('Error adding saving', error);
  }
};
