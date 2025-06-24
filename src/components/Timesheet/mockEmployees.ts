
import { Employee } from '@/services/api';

export const mockEmployees: Employee[] = [
  {
    employeeID: 'EMP001',
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    class: 'Foreman',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    employeeID: 'EMP002',
    firstName: 'Mary',
    lastName: 'Jones',
    fullName: 'Mary Jones',
    email: 'mary.jones@company.com',
    class: 'Journeyman',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  },
  {
    employeeID: 'EMP003',
    firstName: 'Bob',
    lastName: 'Wilson',
    fullName: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    class: 'Apprentice',
    department: 'Construction',
    unionID: 1,
    activeEmp: true,
    createdDate: '2024-01-01T00:00:00Z',
    modifiedDate: '2024-01-01T00:00:00Z'
  }
];
