
import { Employee, ApiResponse } from './api';

// Employee service to handle SQL Server database operations
export class EmployeeService {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${this.baseUrl}/employees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Employee[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      // Return mock data as fallback for development
      return this.getMockEmployees();
    }
  }

  async getActiveEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${this.baseUrl}/employees/active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Employee[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Failed to fetch active employees:', error);
      // Return mock data as fallback
      return this.getMockEmployees();
    }
  }

  private getMockEmployees(): Employee[] {
    return [
      { 
        employeeID: "EMP001", 
        firstName: "John", 
        lastName: "Doe", 
        fullName: "John Doe", 
        email: "john.doe@company.com", 
        class: "Foreman", 
        department: "Construction", 
        unionID: 1, 
        activeEmp: true, 
        createdDate: "2024-01-01T00:00:00Z", 
        modifiedDate: "2024-01-01T00:00:00Z"
      },
      { 
        employeeID: "EMP002", 
        firstName: "Jane", 
        lastName: "Smith", 
        fullName: "Jane Smith", 
        email: "jane.smith@company.com", 
        class: "Supervisor", 
        department: "Construction", 
        unionID: 1, 
        activeEmp: true, 
        createdDate: "2024-01-01T00:00:00Z", 
        modifiedDate: "2024-01-01T00:00:00Z"
      },
      { 
        employeeID: "EMP003", 
        firstName: "Mike", 
        lastName: "Johnson", 
        fullName: "Mike Johnson", 
        email: "mike.johnson@company.com", 
        class: "Laborer", 
        department: "Construction", 
        unionID: 1, 
        activeEmp: true, 
        createdDate: "2024-01-01T00:00:00Z", 
        modifiedDate: "2024-01-01T00:00:00Z"
      },
      { 
        employeeID: "EMP004", 
        firstName: "Sarah", 
        lastName: "Wilson", 
        fullName: "Sarah Wilson", 
        email: "sarah.wilson@company.com", 
        class: "Project Manager", 
        department: "Management", 
        unionID: 1, 
        activeEmp: true, 
        createdDate: "2024-01-01T00:00:00Z", 
        modifiedDate: "2024-01-01T00:00:00Z"
      },
      { 
        employeeID: "EMP005", 
        firstName: "David", 
        lastName: "Brown", 
        fullName: "David Brown", 
        email: "david.brown@company.com", 
        class: "Electrician", 
        department: "Construction", 
        unionID: 2, 
        activeEmp: true, 
        createdDate: "2024-01-01T00:00:00Z", 
        modifiedDate: "2024-01-01T00:00:00Z"
      }
    ];
  }
}

export const employeeService = new EmployeeService();
