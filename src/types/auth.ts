
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'patient';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'doctor' | 'patient') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'doctor' | 'patient') => Promise<void>;
  logout: () => void;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  riskScore: number;
  lastAnalysis: string;
  conditions: string[];
  variants: string[];
}
