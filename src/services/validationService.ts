
import { timesheetApi } from './api';

export interface DuplicateCheckParams {
  readonly employeeId: string;
  readonly dateWorked: string;
  readonly projectCode: string;
  readonly costCode: string;
  readonly excludeEntryId?: number;
}

export interface DuplicateCheckResult {
  readonly exists: boolean;
  readonly existingEntry?: {
    readonly entryID: number;
    readonly hours: number;
    readonly status: string;
  };
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}

export interface BatchValidationResult {
  readonly isValid: boolean;
  readonly entryErrors: readonly Array<{
    readonly index: number;
    readonly errors: readonly string[];
  }>;
}

export interface TimesheetEntryData {
  readonly employeeId: string;
  readonly dateWorked: string;
  readonly projectCode: string;
  readonly costCode: string;
  readonly standardHours: number;
  readonly overtimeHours: number;
  readonly entryId?: number;
}

// Constants for validation rules
const VALIDATION_RULES = {
  MAX_DAILY_HOURS: 16,
  MIN_HOUR_INCREMENT: 0.25,
  MIN_HOURS: 0
} as const;

const VALIDATION_MESSAGES = {
  DUPLICATE_ENTRY: 'A duplicate entry already exists for this employee, date, project, and cost code',
  EXCEEDS_MAX_HOURS: `Total hours cannot exceed ${VALIDATION_RULES.MAX_DAILY_HOURS} hours per day`,
  INVALID_INCREMENT: `Hours must be in quarter-hour increments (${VALIDATION_RULES.MIN_HOUR_INCREMENT})`,
  NEGATIVE_HOURS: 'Hours cannot be negative',
  INVALID_EMPLOYEE_ID: 'Employee ID is required and must be valid',
  INVALID_DATE: 'Date worked is required and must be valid',
  INVALID_PROJECT_CODE: 'Project code is required',
  INVALID_COST_CODE: 'Cost code is required'
} as const;

// Helper functions
const isValidHourIncrement = (hours: number): boolean => {
  return hours % VALIDATION_RULES.MIN_HOUR_INCREMENT === 0;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
};

// Check for duplicate timesheet entries
export const checkDuplicateEntry = async (
  params: DuplicateCheckParams
): Promise<DuplicateCheckResult> => {
  try {
    // Validate input parameters
    if (!params.employeeId || !params.dateWorked || !params.projectCode || !params.costCode) {
      throw new Error('Missing required parameters for duplicate check');
    }

    // TODO: Replace with actual API call when backend is ready
    // const response = await timesheetApi.checkDuplicate(params);
    // return response.data;
    
    // Mock implementation for development
    console.log('Checking for duplicate entry:', params);
    
    return {
      exists: false
    };
  } catch (error) {
    console.error('Error checking for duplicate entry:', error);
    throw new Error('Failed to check for duplicate entries. Please try again.');
  }
};

// Validate basic entry data
const validateEntryData = (entry: TimesheetEntryData): string[] => {
  const errors: string[] = [];

  // Required field validation
  if (!entry.employeeId || entry.employeeId.trim() === '') {
    errors.push(VALIDATION_MESSAGES.INVALID_EMPLOYEE_ID);
  }

  if (!entry.dateWorked || !isValidDate(entry.dateWorked)) {
    errors.push(VALIDATION_MESSAGES.INVALID_DATE);
  }

  if (!entry.projectCode || entry.projectCode.trim() === '') {
    errors.push(VALIDATION_MESSAGES.INVALID_PROJECT_CODE);
  }

  if (!entry.costCode || entry.costCode.trim() === '') {
    errors.push(VALIDATION_MESSAGES.INVALID_COST_CODE);
  }

  return errors;
};

// Validate hour values
const validateHours = (standardHours: number, overtimeHours: number): string[] => {
  const errors: string[] = [];

  // Check for negative hours
  if (standardHours < VALIDATION_RULES.MIN_HOURS || overtimeHours < VALIDATION_RULES.MIN_HOURS) {
    errors.push(VALIDATION_MESSAGES.NEGATIVE_HOURS);
  }

  // Check for valid increments
  if (!isValidHourIncrement(standardHours) || !isValidHourIncrement(overtimeHours)) {
    errors.push(VALIDATION_MESSAGES.INVALID_INCREMENT);
  }

  // Check total hours
  const totalHours = standardHours + overtimeHours;
  if (totalHours > VALIDATION_RULES.MAX_DAILY_HOURS) {
    errors.push(VALIDATION_MESSAGES.EXCEEDS_MAX_HOURS);
  }

  return errors;
};

// Validate a complete timesheet entry
export const validateTimesheetEntry = async (entry: TimesheetEntryData): Promise<ValidationResult> => {
  try {
    const errors: string[] = [];

    // Basic data validation
    errors.push(...validateEntryData(entry));

    // Hours validation
    errors.push(...validateHours(entry.standardHours, entry.overtimeHours));

    // Skip duplicate check if basic validation failed
    if (errors.length === 0) {
      // Check for duplicates
      const duplicateCheck = await checkDuplicateEntry({
        employeeId: entry.employeeId,
        dateWorked: entry.dateWorked,
        projectCode: entry.projectCode,
        costCode: entry.costCode,
        excludeEntryId: entry.entryId
      });

      if (duplicateCheck.exists) {
        errors.push(VALIDATION_MESSAGES.DUPLICATE_ENTRY);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  } catch (error) {
    console.error('Error validating timesheet entry:', error);
    return {
      isValid: false,
      errors: ['An error occurred while validating the entry. Please try again.']
    };
  }
};

// Batch validate multiple entries
export const validateMultipleEntries = async (
  entries: readonly TimesheetEntryData[]
): Promise<BatchValidationResult> => {
  try {
    if (!Array.isArray(entries) || entries.length === 0) {
      return {
        isValid: true,
        entryErrors: []
      };
    }

    const entryErrors: Array<{ index: number; errors: string[] }> = [];

    // Validate each entry
    for (let i = 0; i < entries.length; i++) {
      const validation = await validateTimesheetEntry(entries[i]);
      if (!validation.isValid) {
        entryErrors.push({
          index: i,
          errors: [...validation.errors]
        });
      }
    }

    return {
      isValid: entryErrors.length === 0,
      entryErrors
    };
  } catch (error) {
    console.error('Error validating multiple entries:', error);
    return {
      isValid: false,
      entryErrors: [{
        index: -1,
        errors: ['An error occurred while validating entries. Please try again.']
      }]
    };
  }
};

// Export validation rules and messages for use in components
export { VALIDATION_RULES, VALIDATION_MESSAGES };
