
export interface TimeEntryData {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
  timeIn?: string;
  timeOut?: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface ComprehensiveTimeEntryFormProps {
  onSubmit: (data: TimeEntryData | TimeEntryData[]) => void;
  managerMode?: boolean;
}

export interface TabContentProps {
  entries: TimeEntryData[];
  setEntries: (entries: TimeEntryData[]) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  useMultiDateSelection: boolean;
  setUseMultiDateSelection: (use: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  managerMode?: boolean;
}
