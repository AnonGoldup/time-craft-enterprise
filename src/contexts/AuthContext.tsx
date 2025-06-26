import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin'
}

export interface User {
  userId: string;
  employeeId: string;
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (employeeId: string, email: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
  isManager: () => boolean;
  loading: boolean;
  UserRole: typeof UserRole; // Export UserRole enum through context
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Verify token with backend
          const response = await api.get('/auth/me');
          if (response.data.success && response.data.user) {
            setUser(response.data.user as User);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (employeeId: string, passwordOrEmail: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Check if it's an email (for first-time login) or password
      const isEmail = passwordOrEmail.includes('@');
      
      const payload = isEmail ? {
        employeeId,
        email: passwordOrEmail
      } : {
        employeeId,
        password: passwordOrEmail
      };
      
      const response = await api.post('/auth/login', payload);

      if (response.data.needsPasswordSetup) {
        // Throw error with setup token to be handled by Login component
        const error = new Error('Password setup required') as any;
        error.needsPasswordSetup = true;
        error.setupToken = response.data.setupToken;
        throw error;
      }

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store token
        localStorage.setItem('authToken', token);
        
        // Set user state
        setUser(user as User);
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // If it's a password setup error, re-throw it
      if (error.needsPasswordSetup) {
        throw error;
      }
      throw new Error(error.response?.data?.error?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint (optional, for logging purposes)
      await api.post('/auth/logout').catch(() => {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      window.location.href = '/login';
    }
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isManager = (): boolean => {
    return hasRole([UserRole.MANAGER, UserRole.ADMIN]);
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    isManager,
    loading,
    UserRole // Include UserRole in the context value
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
