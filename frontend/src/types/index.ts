export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt: number;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
}

export interface Settings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
