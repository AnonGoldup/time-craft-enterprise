
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTimeEntryData, useTimeEntryForm } from "./TimeEntry/hooks/useTimeEntryData";
import TimeEntryFormFields from "./TimeEntry/TimeEntryFormFields";
import TimeEntrySubmission from "./TimeEntry/TimeEntrySubmission";

const EnhancedTimeEntryForm = () => {
  const { user } = useAuth();
  const { projects, projectExtras, costCodes, loadProjectExtras } = useTimeEntryData();
  const {
    entries,
    setEntries,
    loading,
    setLoading,
    updateEntry,
    addEntry,
    copyLastEntry,
    removeEntry,
    setQuickHours
  } = useTimeEntryForm();

  const handleProjectChange = (entryId: number, projectId: string) => {
    updateEntry(entryId, 'projectID', projectId);
    if (projectId) {
      loadProjectExtras(parseInt(projectId));
    }
  };

  const enhancedUpdateEntry = (id: number, field: string, value: string) => {
    if (field === 'projectID') {
      handleProjectChange(id, value);
    } else {
      updateEntry(id, field, value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Time Entry</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={copyLastEntry}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Last
          </Button>
          <Button variant="outline" onClick={addEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <Card key={entry.id} className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">
                Entry #{entry.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimeEntryFormFields
                entry={entry}
                updateEntry={enhancedUpdateEntry}
                projects={projects}
                projectExtras={projectExtras}
                costCodes={costCodes}
                setQuickHours={setQuickHours}
                userFullName={user?.fullName}
                canRemove={entries.length > 1}
                onRemove={removeEntry}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <TimeEntrySubmission
        entries={entries}
        setEntries={setEntries}
        loading={loading}
        setLoading={setLoading}
        userEmployeeId={user?.employeeId}
      />
    </div>
  );
};

export default EnhancedTimeEntryForm;
