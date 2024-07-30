import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  profileData: null,
  sidebarOpen: false,
  setSidebarOpen: (data) => set({ sidebarOpen: data }),
  setProfileData: (data) => set({ profileData: data }),
}));
