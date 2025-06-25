
import { DashboardData } from './types';

export const dashboardData: DashboardData = {
  overview: {
    pendingReviews: 5,
    totalHours: 412.5,
    avgEfficiency: 87,
    activeProjects: 15,
    weeklyBudget: 125000,
    actualCost: 98750
  },
  recentSubmissions: [{
    id: 1,
    employeeName: 'John Smith',
    employeeId: 'JSMITH',
    class: 'FMAN',
    status: 'Pending' as const,
    totalHours: 44.0,
    overtimeHours: 4.0,
    efficiency: 92,
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    extraDescription: 'Initial Setup and Planning',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    projects: ['21-0066', '22-0006'],
    anomalies: ['Overtime exceeded 2hrs on Tuesday'],
    notes: 'Weather delay required extended hours',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T09:15:00'
  }, {
    id: 2,
    employeeName: 'Sarah Johnson',
    employeeId: 'SJOHN',
    class: 'JMAN',
    status: 'Pending' as const,
    totalHours: 40.0,
    overtimeHours: 0,
    efficiency: 95,
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 2',
    extraDescription: 'Implementation Phase',
    costCode: '001-040-054',
    costCodeDescription: 'INDIRECT LAB-Employee Training',
    projects: ['21-0066'],
    anomalies: [],
    notes: 'Standard week, excellent performance',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T10:30:00'
  }, {
    id: 3,
    employeeName: 'Mike Wilson',
    employeeId: 'MWILS',
    class: 'AP3',
    status: 'Pending' as const,
    totalHours: 42.0,
    overtimeHours: 2.0,
    efficiency: 85,
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School',
    extraValue: 'Default',
    extraDescription: 'Standard Work',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    projects: ['24-0052'],
    anomalies: [],
    notes: 'Training completion bonus hours',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-15T16:45:00'
  }, {
    id: 4,
    employeeName: 'Lisa Brown',
    employeeId: 'LBROW',
    class: 'JMAN',
    status: 'Pending' as const,
    totalHours: 40.0,
    overtimeHours: 0,
    efficiency: 88,
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School',
    extraValue: 'Phase 1',
    extraDescription: 'Site Preparation',
    costCode: '001-500-501',
    costCodeDescription: 'GENEXP-Vehicle Travel',
    projects: ['24-0052'],
    anomalies: [],
    notes: 'Site preparation completed ahead of schedule',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T11:00:00'
  }, {
    id: 5,
    employeeName: 'Tom Davis',
    employeeId: 'TDAVI',
    class: 'AP2',
    status: 'Pending' as const,
    totalHours: 38.0,
    overtimeHours: 0,
    efficiency: 91,
    projectCode: '22-0006',
    projectDescription: 'AltaPro Service Department',
    extraValue: 'Default',
    extraDescription: 'Standard Service Work',
    costCode: '001-040-055',
    costCodeDescription: 'INDIRECT LAB-Safety Training',
    projects: ['22-0006'],
    anomalies: [],
    notes: 'Completed safety certification training',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T08:45:00'
  }],
  projectMetrics: [{
    code: '21-0066',
    name: 'Edmonton EXPO SOLAR IPD',
    totalHours: 156.5,
    budgetHours: 2400,
    budgetUsed: 67,
    efficiency: 91,
    daysRemaining: 45,
    status: 'On Track',
    cost: 145000
  }, {
    code: '22-0006',
    name: 'AltaPro Service Department',
    totalHours: 98.0,
    budgetHours: 800,
    budgetUsed: 78,
    efficiency: 95,
    daysRemaining: 30,
    status: 'Behind Schedule',
    cost: 89500
  }, {
    code: '24-0052',
    name: 'Grant MacEwan School',
    totalHours: 67.5,
    budgetHours: 1200,
    budgetUsed: 23,
    efficiency: 88,
    daysRemaining: 90,
    status: 'Ahead of Schedule',
    cost: 67200
  }],
  weeklyTrends: {
    hoursData: [{
      day: 'Mon',
      standard: 320,
      overtime: 12
    }, {
      day: 'Tue',
      standard: 315,
      overtime: 18
    }, {
      day: 'Wed',
      standard: 310,
      overtime: 8
    }, {
      day: 'Thu',
      standard: 325,
      overtime: 15
    }, {
      day: 'Fri',
      standard: 305,
      overtime: 22
    }, {
      day: 'Sat',
      standard: 45,
      overtime: 8
    }],
    efficiencyTrend: [88, 91, 87, 93, 89, 92],
    costTrend: [18500, 19200, 17800, 20100, 18900, 4200]
  }
};
