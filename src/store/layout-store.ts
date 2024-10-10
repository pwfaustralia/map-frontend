import { create } from 'zustand';
import { LayoutStore } from './types';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      isMenuOpen: false,
      toggleMenu: () => set({ isMenuOpen: !get().isMenuOpen }),
    }),
    {
      name: 'layout-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
