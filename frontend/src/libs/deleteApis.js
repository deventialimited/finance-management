import axios from 'axios';

const backend_base = 'http://localhost:4000'; // Replace with your backend base URL

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
