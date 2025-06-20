
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '../services/api';

export enum UserRole {
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  FOREMAN = 'foreman'
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
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        
        // Map backend user structure to AuthContext User type
        let role: UserRole = UserRole.EMPLOYEE;
        if (userData.class) {
          const classUpper = userData.class.toUpperCase();
          if (classUpper === 'ADMIN') {
            role = UserRole.ADMIN;
          } else if (classUpper === 'PM' || classUpper === 'MANAGER') {
            role = UserRole.MANAGER;
          } else if (classUpper === 'FMAN' || classUpper === 'FOREMAN' || classUpper.includes('FOREMAN')) {
            role = UserRole.FOREMAN;
          } else if (classUpper === 'SUPERVISOR' || classUpper === 'SUPER') {
            role = UserRole.SUPERVISOR;
          }
        }
        
        setUser({
          userId: userData.employeeId,
          employeeId: userData.employeeId,
          email: userData.email,
          fullName: userData.fullName,
          role: role,
          department: userData.department || '',
          isActive: true
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    throw new Error('Please use the Login page for authentication');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isManager = (): boolean => {
    return hasRole([UserRole.MANAGER, UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.FOREMAN]);
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
