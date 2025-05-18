// store/auth.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store de autenticación con Zustand
 * 
 * Este store implementa:
 * - Persistencia de datos con localStorage (persist middleware)
 * - Gestión de estado global de la aplicación
 * - Funciones para login y logout
 * - Almacenamiento del personaje favorito
 * 
 * CREDENCIALES DE ACCESO HARDCODEADAS:
 * Usuario: Test123
 * Contraseña: password@2
 */
export const useAuth = create(
  persist(
    (set) => ({
      user: null,        // string: 'Test123'
      favorite: null,    // object: { id, name, image }
      _hydrated: false,  // controla si los datos persistidos ya fueron cargados

      /**
       * Función de login
       * Verifica las credenciales y guarda el usuario y favorito
       */
      login: ({ username, password, favorite }) => {
        // Verificación de credenciales hardcodeadas
        if (username === 'Test123' && password === 'password@2') {
          // guardamos el usuario y el objeto completo del personaje favorito
          set({ user: username, favorite });
          return true;
        }
        return false;
      },

      /**
       * Función de logout
       * Elimina los datos de usuario y favorito
       */
      logout: () => set({ user: null, favorite: null }),
    }),
    {
      name: 'auth-storage',
      // Solo persistimos user y favorite, ignorando _hydrated
      partialize: (state) => ({
        user: state.user,
        favorite: state.favorite,
      }),
      // Cuando se rehidrata, marcamos _hydrated como true
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    }
  )
);
