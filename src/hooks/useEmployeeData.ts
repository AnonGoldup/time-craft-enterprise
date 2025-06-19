
import { useState, useEffect } from 'react';
import { Employee } from '@/services/api';
import { employeeService } from '@/services/employeeService';

export const useEmployeeData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const employeeData = await employeeService.getActiveEmployees();
      setEmployees(employeeData);
    } catch (err) {
      console.error('Failed to load employees:', err);
      setError('Failed to load employees');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshEmployees = () => {
    loadEmployees();
  };

  return {
    employees,
    loading,
    error,
    refreshEmployees
  };
};
