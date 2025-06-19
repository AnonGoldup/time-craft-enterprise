
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import { toast } from "sonner";
import { TimesheetEntry } from "@/services/api";
import { EntryFormData, validateAllEntries } from "./EntryValidation";

interface TimeEntrySubmissionProps {
  entries: EntryFormData[];
  setEntries: (entries: EntryFormData[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userEmployeeId?: string;
  onSuccess?: () => void;
}

const TimeEntrySubmission: React.FC<TimeEntrySubmissionProps> = ({
  entries,
  setEntries,
  loading,
  setLoading,
  userEmployeeId,
  onSuccess
}) => {
  const handleSubmit = async () => {
    if (!userEmployeeId) return;

    // Validate all entries
    const { entries: validatedEntries, hasErrors } = validateAllEntries(entries);
    setEntries(validatedEntries);

    if (hasErrors) {
      return;
    }

    try {
      setLoading(true);
      
      // Convert form data to API format with all required fields
      const apiEntries: Omit<TimesheetEntry, 'entryID'>[] = validatedEntries.map(entry => ({
        employeeID: userEmployeeId,
        dateWorked: entry.date,
        projectID: parseInt(entry.projectID),
        extraID: entry.extraID ? parseInt(entry.extraID) : 0,
        costCodeID: parseInt(entry.costCodeID),
        payID: 1, // Standard hours
        hours: parseFloat(entry.standardHours) || 0,
        unionID: 1,
        entryType: 'Standard',
        notes: entry.notes || '',
        status: 'Draft',
        createdBy: userEmployeeId,
        createdDate: new Date().toISOString(),
        modifiedBy: '',
        modifiedDate: '',
        exportedDate: '',
        startTime: '',
        endTime: '',
        breakInTime: '',
        breakOutTime: '',
        timeIn: '',
        timeOut: '',
        breakIn: '',
        breakOut: ''
      }));

      // Add overtime entries if applicable
      const overtimeEntries: Omit<TimesheetEntry, 'entryID'>[] = validatedEntries
        .filter(entry => parseFloat(entry.overtimeHours) > 0)
        .map(entry => ({
          employeeID: userEmployeeId,
          dateWorked: entry.date,
          projectID: parseInt(entry.projectID),
          extraID: entry.extraID ? parseInt(entry.extraID) : 0,
          costCodeID: parseInt(entry.costCodeID),
          payID: 2, // Overtime hours
          hours: parseFloat(entry.overtimeHours),
          unionID: 1,
          entryType: 'Standard',
          notes: entry.notes || '',
          status: 'Draft',
          createdBy: userEmployeeId,
          createdDate: new Date().toISOString(),
          modifiedBy: '',
          modifiedDate: '',
          exportedDate: '',
          startTime: '',
          endTime: '',
          breakInTime: '',
          breakOutTime: '',
          timeIn: '',
          timeOut: '',
          breakIn: '',
          breakOut: ''
        }));

      // Submit all entries
      for (const entry of [...apiEntries, ...overtimeEntries]) {
        // Mock API call for now
        console.log('Submitting entry:', entry);
      }

      toast.success("Time entries saved successfully!");
      
      // Reset form
      setEntries([{
        id: 1,
        date: new Date().toISOString().split('T')[0],
        projectID: "",
        extraID: "",
        costCodeID: "",
        standardHours: "",
        overtimeHours: "",
        notes: "",
        errors: {}
      }]);

      onSuccess?.();
      
    } catch (error) {
      toast.error("Failed to save time entries");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    toast.success("Draft saved successfully!");
  };

  return (
    <div className="flex justify-end space-x-4">
      <Button variant="outline" onClick={handleSaveDraft} disabled={loading}>
        <Save className="h-4 w-4 mr-2" />
        Save Draft
      </Button>
      <Button 
        onClick={handleSubmit}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Saving...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Save Entries
          </>
        )}
      </Button>
    </div>
  );
};

export default TimeEntrySubmission;
