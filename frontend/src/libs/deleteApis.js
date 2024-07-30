import axios from 'axios';

const backend_base = 'https://api.kinglaf.com'; // Replace with your backend base URL
// Replace with your backend base URL

export const deleteDebt = async (id) => {
  try {
    const response = await axios.delete(
      `${backend_base}/api/debts/deleteDebt/${id}`,
    );
    return response?.data?.debt;
  } catch (error) {
    console.log('Error deleting debt', error);
  }
};

export const deleteSaving = async (id) => {
  try {
    const response = await axios.delete(
      `${backend_base}/api/savings/deleteSaving/${id}`,
    );
    return response?.data?.saving;
  } catch (error) {
    console.log('Error deleting saving', error);
  }
};

export const deleteRevenue = async (id) => {
  try {
    const response = await axios.delete(
      `${backend_base}/api/revenues/deleteRevenue/${id}`,
    );
    return response?.data?.revenue;
  } catch (error) {
    console.log('Error deleting revenue', error);
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(
      `${backend_base}/api/expenses/deleteExpense/${id}`,
    );
    return response?.data?.expense;
  } catch (error) {
    console.log('Error deleting expense', error);
  }
};
