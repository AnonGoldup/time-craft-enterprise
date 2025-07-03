
import { toast } from "sonner";

export interface EntryFormData {
  id: number;
  employeeID: string;
  dateWorked: string;
  projectID: number;
  extraID?: number;
  costCodeID: number;
  hours: number;
  payID: number;
  notes: string;
  status?: string;
  errors: {
    [key: string]: string;
  };
}

export const validateEntry = (entry: EntryFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!entry.dateWorked) {
    errors.dateWorked = "Date is required";
  }

  if (!entry.projectID) {
    errors.projectID = "Project is required";
  }

  if (!entry.costCodeID) {
    errors.costCodeID = "Cost code is required";
  }

  if (!entry.employeeID) {
    errors.employeeID = "Employee is required";
  }

  const hours = entry.hours || 0;

  if (hours <= 0) {
    errors.hours = "Hours must be greater than 0";
  }

  if (hours > 16) {
    errors.hours = "Hours cannot exceed 16 hours per day";
  }

  return errors;
};

export const validateAllEntries = (entries: EntryFormData[]): { entries: EntryFormData[], hasErrors: boolean } => {
  let hasErrors = false;
  const validatedEntries = entries.map(entry => {
    const errors = validateEntry(entry);
    hasErrors = hasErrors || Object.keys(errors).length > 0;
    return { ...entry, errors };
  });

  if (hasErrors) {
    toast.error("Please fix validation errors before submitting");
  }

  return { entries: validatedEntries, hasErrors };
};
