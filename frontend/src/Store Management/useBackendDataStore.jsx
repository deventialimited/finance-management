import { create } from 'zustand';

export const useBackendDataStore = create((set) => ({
  bills: null,
  expenses: null,
  transactions: null,
  savings: null,
  debts: null,
  updateAllBills: (data) => set({ bills: data }),
  updateAllExpenses: (data) => set({ expenses: data }),
  updateAllTransactions: (data) => set({ transactions: data }),
  updateAllSavings: (data) => set({ savings: data }),
  updateAllDebts: (data) => set({ debts: data }),
}));
