
export interface TimesheetSubmission {
  readonly id: number;
  readonly employeeName: string;
  readonly employeeId: string;
  readonly class: string;
  readonly status: 'Pending' | 'Approved' | 'Rejected';
  readonly totalHours: number;
  readonly overtimeHours: number;
  readonly efficiency: number;
  readonly projectCode: string;
  readonly projectDescription: string;
  readonly extraValue: string;
  readonly extraDescription: string;
  readonly costCode: string;
  readonly costCodeDescription: string;
  readonly projects: readonly string[];
  readonly anomalies: readonly string[];
  readonly notes: string;
  readonly weekEnding: string;
  readonly submitDate: string;
}

export interface ProjectGroup {
  readonly projectCode: string;
  readonly projectDescription: string;
  readonly submissions: readonly TimesheetSubmission[];
}

export interface OverviewMetrics {
  readonly pendingReviews: number;
  readonly totalHours: number;
  readonly avgEfficiency: number;
  readonly activeProjects: number;
  readonly weeklyBudget: number;
  readonly actualCost: number;
}

export interface ProjectMetric {
  readonly code: string;
  readonly name: string;
  readonly totalHours: number;
  readonly budgetHours: number;
  readonly budgetUsed: number;
  readonly efficiency: number;
  readonly daysRemaining: number;
  readonly status: string;
  readonly cost: number;
}

export interface WeeklyTrendData {
  readonly day: string;
  readonly standard: number;
  readonly overtime: number;
}

export interface WeeklyTrends {
  readonly hoursData: readonly WeeklyTrendData[];
  readonly efficiencyTrend: readonly number[];
  readonly costTrend: readonly number[];
}

export interface DashboardData {
  readonly overview: OverviewMetrics;
  readonly recentSubmissions: readonly TimesheetSubmission[];
  readonly projectMetrics: readonly ProjectMetric[];
  readonly weeklyTrends: WeeklyTrends;
}

// Error types for better error handling
export interface ApiError {
  readonly message: string;
  readonly code?: string;
  readonly status?: number;
}

export interface ValidationError {
  readonly field: string;
  readonly message: string;
}

// Type guards for runtime type checking
export const isTimesheetSubmission = (obj: unknown): obj is TimesheetSubmission => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as TimesheetSubmission).id === 'number' &&
    typeof (obj as TimesheetSubmission).employeeName === 'string' &&
    typeof (obj as TimesheetSubmission).status === 'string' &&
    ['Pending', 'Approved', 'Rejected'].includes((obj as TimesheetSubmission).status)
  );
};

export const isDashboardData = (obj: unknown): obj is DashboardData => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as DashboardData).overview === 'object' &&
    Array.isArray((obj as DashboardData).recentSubmissions)
  );
};
