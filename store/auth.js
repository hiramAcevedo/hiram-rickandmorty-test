// store/auth.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuth = create(
  persist(
    (set) => ({
      user: null,        // string: 'Test123'
      favorite: null,    // object: { id, name, image }
      _hydrated: false,

      login: ({ username, password, favorite }) => {
        if (username === 'Test123' && password === 'password@2') {
          // guardamos el objeto completo de favorite
          set({ user: username, favorite });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, favorite: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        favorite: state.favorite,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    }
  )
);
