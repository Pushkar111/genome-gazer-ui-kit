
import { create } from 'zustand';
import { AuthState, User } from '@/types/auth';

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'doctor@genomics.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'patient@genomics.com',
    name: 'John Smith',
    role: 'patient',
    createdAt: '2024-01-01'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string, role: 'doctor' | 'patient') => {
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      set({ user, isAuthenticated: true });
      localStorage.setItem('genomics_user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  register: async (email: string, password: string, name: string, role: 'doctor' | 'patient') => {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    set({ user: newUser, isAuthenticated: true });
    localStorage.setItem('genomics_user', JSON.stringify(newUser));
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('genomics_user');
  }
}));

// Initialize auth state from localStorage
const storedUser = localStorage.getItem('genomics_user');
if (storedUser) {
  const user = JSON.parse(storedUser);
  useAuthStore.setState({ user, isAuthenticated: true });
}
