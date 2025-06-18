import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '../services/api';

export enum UserRole {
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
  isManager: () => boolean;
  loading: boolean;
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
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser({
            userId: payload.userId,
            employeeId: payload.employeeId,
            email: payload.email,
            fullName: payload.fullName,
            role: payload.role,
            department: payload.department,
            isActive: payload.isActive
          });
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      
      // Mock authentication - replace with actual API call
      if (email === 'john.doe@company.com' && password === 'password') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1wbG95ZWVJZCI6IkpEMDAxIiwiZW1haWwiOiJqb2huLmRvZUBjb21wYW55LmNvbSIsImZ1bGxOYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiZW1wbG95ZWUiLCJkZXBhcnRtZW50IjoiRWxlY3RyaWNhbCIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2NDA5OTUyMDAsImV4cCI6MjY0MDk5ODgwMH0.mockSignature';
        
        localStorage.setItem('authToken', mockToken);
        
        setUser({
          userId: '1',
          employeeId: 'JD001',
          email: 'john.doe@company.com',
          fullName: 'John Doe',
          role: 'employee',
          department: 'Electrical',
          isActive: true
        });
      } else if (email === 'admin@company.com' && password === 'password') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiZW1wbG95ZWVJZCI6IkFEMDAxIiwiZW1haWwiOiJhZG1pbkBjb21wYW55LmNvbSIsImZ1bGxOYW1lIjoiQWRtaW4gVXNlciIsInJvbGUiOiJhZG1pbiIsImRlcGFydG1lbnQiOiJBZG1pbmlzdHJhdGlvbiIsImlzQWN0aXZlIjp0cnVlLCJpYXQiOjE2NDA5OTUyMDAsImV4cCI6MjY0MDk5ODgwMH0.mockSignature';
        
        localStorage.setItem('authToken', mockToken);
        
        setUser({
          userId: '3',
          employeeId: 'AD001',
          email: 'admin@company.com',
          fullName: 'Admin User',
          role: 'admin',
          department: 'Administration',
          isActive: true
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isManager = (): boolean => {
    return hasRole(['admin']);
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    isManager,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
