import axios from 'axios';

const backend_base = 'http://localhost:4000'; // Replace with your backend base URL

export const updateDebt = async (id, formData) => {
  try {
    const response = await axios.put(
      `${backend_base}/api/debts/updateDebt/${id}`,
      formData,
    );
    return response?.data?.debt;
  } catch (error) {
    console.log('Error updating debt', error);
  }
};

export const updateSaving = async (id, formData) => {
  try {
    const response = await axios.put(
      `${backend_base}/api/savings/updateSaving/${id}`,
      formData,
    );
    return response?.data?.saving;
  } catch (error) {
    console.log('Error updating saving', error);
  }
};
