import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (data) => set({ sidebarOpen: data }),
}));
