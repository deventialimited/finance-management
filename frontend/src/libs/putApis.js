import axios from 'axios';

const backend_base = 'https://api.kinglaf.com'; // Replace with your backend base URL
// Replace with your backend base URL

export const updateProfile = async (id, formData) => {
  try {
    const response = await axios.put(
      `${backend_base}/api/profile/updateProfile/${id}`,
      formData,
    );
    return response?.data?.profile;
  } catch (error) {
    console.log('Error updating profile', error);
  }
};

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
