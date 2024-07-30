import axios from 'axios';

const backend_base = 'https://api.kinglaf.com'; // Replace with your backend base URL
// Replace with your backend base URL

export const addRevenue = async (formData) => {
  try {
    const response = await axios.post(
      `${backend_base}/api/revenues/addRevenue`,
      formData,
    );
    console.log(response)
    return response?.data?.revenue;
  } catch (error) {
    console.log('Error adding revenue', error);
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
