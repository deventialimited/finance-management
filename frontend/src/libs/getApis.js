import axios from 'axios';
import Housing from '/public/images/icon/icon-housing.svg';
import Food from '/public/images/icon/icon-food.svg';
import Transportation from '/public/images/icon/icon-transportation.svg';
import Entertainment from '/public/images/icon/icon-entertainment.svg';
import Shopping from '/public/images/icon/icon-shopping.svg';
import Others from '/public/images/icon/icon-others.svg';
const Icons = {
  Housing,
  Food,
  Transportation,
  Entertainment,
  Shopping,
  Others,
};
const backend_base = 'http://localhost:4000'; // Replace with your backend base URL

export const getAllTransactions = async () => {
  try {
    const response = await axios.get(
      `${backend_base}/api/transactions/getAllTransactions`,
    );
    return response?.data?.transactions;
  } catch (error) {
    console.log('Error fetching transactions', error);
  }
};

export const getAllBills = async () => {
  try {
    const response = await axios.get(`${backend_base}/api/bills/getAllBills`);
    return response?.data?.bills;
  } catch (error) {
    console.log('Error fetching bills', error);
  }
};

export const getAllExpenses = async () => {
  try {
    const response = await axios.get(
      `${backend_base}/api/expenses/getAllExpenses`,
    );
    if (response?.data?.expenses) {
      const categoryTemplate = {
        color: '#723097',
      };

      const groupedExpenses = {};
      let totalAmount = 0;

      // Group expenses by category and calculate total amount for each category
      response?.data?.expenses.forEach((expense) => {
        if (!groupedExpenses[expense.category]) {
          groupedExpenses[expense.category] = {
            category: expense.category,
            amount: 0,
            percentage: 0,
            lists: [],
            icon: Icons[expense.category],
            ...categoryTemplate,
          };
        }
        groupedExpenses[expense.category].amount += expense.amount;
        groupedExpenses[expense.category].lists.push(expense);
        totalAmount += expense.amount;
      });

      // Calculate percentage for each category
      Object.keys(groupedExpenses).forEach((category) => {
        groupedExpenses[category].percentage =
          (groupedExpenses[category].amount / totalAmount) * 100;
      });

      // Convert groupedExpenses object to array
      const result = Object.values(groupedExpenses);
      return result;
    } else {
      return response?.data?.expenses;
    }
  } catch (error) {
    console.log('Error fetching expenses', error);
  }
};

export const getAllDebts = async () => {
  try {
    const response = await axios.get(`${backend_base}/api/debts/getAllDebts`);
    return response?.data?.debts;
  } catch (error) {
    console.log('Error fetching debts', error);
  }
};

export const getAllSavings = async () => {
  try {
    const response = await axios.get(
      `${backend_base}/api/savings/getAllSavings`,
    );
    return response?.data?.savings;
  } catch (error) {
    console.log('Error fetching savings', error);
  }
};
