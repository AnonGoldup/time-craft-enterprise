
export interface TimesheetSubmission {
  id: number;
  employeeName: string;
  employeeId: string;
  class: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  totalHours: number;
  overtimeHours: number;
  efficiency: number;
  projectCode: string;
  projectDescription: string;
  extraValue: string;
  extraDescription: string;
  costCode: string;
  costCodeDescription: string;
  projects: string[];
  anomalies: string[];
  notes: string;
  weekEnding: string;
  submitDate: string;
}

export interface ProjectGroup {
  projectCode: string;
  projectDescription: string;
  submissions: TimesheetSubmission[];
}

export interface DashboardData {
  overview: {
    pendingReviews: number;
    totalHours: number;
    avgEfficiency: number;
    activeProjects: number;
    weeklyBudget: number;
    actualCost: number;
  };
  recentSubmissions: TimesheetSubmission[];
  projectMetrics: Array<{
    code: string;
    name: string;
    totalHours: number;
    budgetHours: number;
    budgetUsed: number;
    efficiency: number;
    daysRemaining: number;
    status: string;
    cost: number;
  }>;
  weeklyTrends: {
    hoursData: Array<{
      day: string;
      standard: number;
      overtime: number;
    }>;
    efficiencyTrend: number[];
    costTrend: number[];
  };
}
