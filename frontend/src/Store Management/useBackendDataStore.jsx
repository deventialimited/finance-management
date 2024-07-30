import { create } from 'zustand';

export const useBackendDataStore = create((set) => ({
  expenses: null,
  revenues: null,
  savings: null,
  debts: null,
  updateAllExpenses: (data) => set({ expenses: data }),
  updateAllRevenues: (data) => set({ revenues: data }),
  updateAllSavings: (data) => set({ savings: data }),
  updateAllDebts: (data) => set({ debts: data }),
}));
