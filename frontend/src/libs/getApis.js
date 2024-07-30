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
export const image_base = 'https://api.kinglaf.com/uploads/';
const backend_base = 'https://api.kinglaf.com'; // Replace with your backend base URL
// Replace with your backend base URL

export const getProfileById = async (id) => {
  try {
    const response = await axios.get(
      `${backend_base}/api/profile/getProfileById/${id}`,
    );
    return response?.data?.profile;
  } catch (error) {
    console.log('Error fetching profile', error);
  }
};

export const getAllRevenues = async () => {
  try {
    const response = await axios.get(
      `${backend_base}/api/revenues/getAllRevenues`,
    );
    if (response?.data?.revenues) {
      const categoryTemplate = {
        color: '#4682B4', // Example color, adjust as needed
      };

      const groupedRevenues = {};
      let totalAmount = 0;

      response?.data?.revenues?.forEach((revenue) => {
        if (!groupedRevenues[revenue.category]) {
          groupedRevenues[revenue.category] = {
            category: revenue.category,
            amount: 0,
            percentage: 0,
            lists: [],
            icon: Icons[revenue.category],
            ...categoryTemplate,
          };
        }
        groupedRevenues[revenue.category].amount += revenue.amount;
        totalAmount += revenue.amount;
        groupedRevenues[revenue.category].lists.push(revenue);
      });

      // Calculate percentage for each category
      Object.keys(groupedRevenues).forEach((category) => {
        groupedRevenues[category].percentage =
          (groupedRevenues[category].amount / totalAmount) * 100;
      });

      // Convert groupedRevenues object to array
      const result = Object.values(groupedRevenues);
      return result;
    } else {
      return response?.data?.revenues;
    }
  } catch (error) {
    console.log('Error fetching revenues', error);
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
      response?.data?.expenses?.forEach((expense) => {
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
      Object.keys(groupedExpenses)?.forEach((category) => {
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
    if (response?.data?.debts) {
      const categoryTemplate = {
        color: '#FF6347', // Example color, adjust as needed
      };

      const groupedDebts = {};
      let totalDebtPaid = 0;

      response?.data?.debts?.forEach((debt) => {
        if (!groupedDebts[debt.category]) {
          groupedDebts[debt.category] = {
            category: debt.category,
            debtPaid: 0,
            percentage: 0,
            lists: [],
            icon: Icons[debt.category],
            ...categoryTemplate,
          };
        }
        groupedDebts[debt.category].debtPaid += debt.debtPaid;
        totalDebtPaid += debt.debtPaid;
        groupedDebts[debt.category].lists.push(debt);
      });

      // Calculate percentage for each category
      Object.keys(groupedDebts).forEach((category) => {
        groupedDebts[category].percentage =
          (groupedDebts[category].debtPaid / totalDebtPaid) * 100;
      });

      // Convert groupedDebts object to array
      const result = Object.values(groupedDebts);
      return result;
    } else {
      return response?.data?.debts;
    }
  } catch (error) {
    console.log('Error fetching debts', error);
  }
};

export const getAllSavings = async () => {
  try {
    const response = await axios.get(
      `${backend_base}/api/savings/getAllSavings`,
    );
    if (response?.data?.savings) {
      const categoryTemplate = {
        color: '#32CD32', // Example color, adjust as needed
      };

      const groupedSavings = {};
      let totalAccumulatedAmount = 0;

      response?.data?.savings?.forEach((saving) => {
        if (!groupedSavings[saving.category]) {
          groupedSavings[saving.category] = {
            category: saving.category,
            accumulatedAmount: 0,
            percentage: 0,
            lists: [],
            icon: Icons[saving.category],
            ...categoryTemplate,
          };
        }
        groupedSavings[saving.category].accumulatedAmount +=
          saving.accumulatedAmount;
        totalAccumulatedAmount += saving.accumulatedAmount;
        groupedSavings[saving.category].lists.push(saving);
      });

      // Calculate percentage for each category
      Object.keys(groupedSavings).forEach((category) => {
        groupedSavings[category].percentage =
          (groupedSavings[category].accumulatedAmount /
            totalAccumulatedAmount) *
          100;
      });

      // Convert groupedSavings object to array
      const result = Object.values(groupedSavings);
      return result;
    } else {
      return response?.data?.savings;
    }
  } catch (error) {
    console.log('Error fetching savings', error);
  }
};
