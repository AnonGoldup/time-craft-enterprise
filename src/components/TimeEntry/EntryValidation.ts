
import { toast } from "sonner";

export interface EntryFormData {
  id: number;
  date: string;
  projectID: string;
  extraID: string;
  costCodeID: string;
  standardHours: string;
  overtimeHours: string;
  notes: string;
  errors: {
    [key: string]: string;
  };
}

export const validateEntry = (entry: EntryFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!entry.date) {
    errors.date = "Date is required";
  }

  if (!entry.projectID) {
    errors.projectID = "Project is required";
  }

  if (!entry.costCodeID) {
    errors.costCodeID = "Cost code is required";
  }

  const standardHours = parseFloat(entry.standardHours) || 0;
  const overtimeHours = parseFloat(entry.overtimeHours) || 0;
  const totalHours = standardHours + overtimeHours;

  if (standardHours < 0) {
    errors.standardHours = "Standard hours cannot be negative";
  }

  if (standardHours > 16) {
    errors.standardHours = "Standard hours cannot exceed 16 hours";
  }

  if (overtimeHours < 0) {
    errors.overtimeHours = "Overtime hours cannot be negative";
  }

  if (overtimeHours > 16) {
    errors.overtimeHours = "Overtime hours cannot exceed 16 hours";
  }

  if (totalHours === 0) {
    errors.hours = "Total hours must be greater than 0";
  }

  if (totalHours > 16) {
    errors.hours = "Total hours cannot exceed 16 hours per day";
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
