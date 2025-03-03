
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company' | 'admin';
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: (userData, token) => set({ 
        user: userData, 
        isAuthenticated: true, 
        token 
      }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        token: null 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
