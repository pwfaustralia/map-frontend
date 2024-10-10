import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ClientStore } from './types';

export const useClientStore = create<ClientStore>()(
  persist(
    (set, get) => ({
      isEditingProfile: false,
      toggleEditingProfile: (open) =>
        set({ isEditingProfile: typeof open !== 'boolean' ? !get().isEditingProfile : open }),
    }),
    {
      name: 'client-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
