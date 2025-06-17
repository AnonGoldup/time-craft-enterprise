
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Save, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { projectApi, timesheetApi, Project, CostCode, ProjectExtra, TimesheetEntry } from "@/services/api";

interface EntryFormData {
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

const EnhancedTimeEntryForm = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<EntryFormData[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      projectID: "",
      extraID: "",
      costCodeID: "",
      standardHours: "",
      overtimeHours: "",
      notes: "",
      errors: {}
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectExtras, setProjectExtras] = useState<{ [key: string]: ProjectExtra[] }>({});
  const [costCodes, setCostCodes] = useState<{ [key: string]: CostCode[] }>({});
  const [loading, setLoading] = useState(false);

  // Load reference data
  useEffect(() => {
    loadProjects();
    loadCostCodes();
  }, []);

  const loadProjects = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockProjects: Project[] = [
        { ProjectID: 1, ProjectCode: "PROJ001", ProjectDescription: "Office Building Renovation", Status: "In progress", IsActive: true },
        { ProjectID: 2, ProjectCode: "PROJ002", ProjectDescription: "Shopping Mall Construction", Status: "In progress", IsActive: true },
        { ProjectID: 3, ProjectCode: "PROJ003", ProjectDescription: "Residential Complex", Status: "In progress", IsActive: true }
      ];
      setProjects(mockProjects);
    } catch (error) {
      toast.error("Failed to load projects");
    }
  };

  const loadCostCodes = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockCostCodes: CostCode[] = [
        { CostCodeID: 1, CostCode: "LAB-001-001", Description: "General Labor" },
        { CostCodeID: 2, CostCode: "EQP-001-001", Description: "Equipment Operation" },
        { CostCodeID: 3, CostCode: "MAT-001-001", Description: "Material Handling" }
      ];
      
      // Set cost codes for all projects (simplified for demo)
      const costCodesByProject: { [key: string]: CostCode[] } = {};
      projects.forEach(project => {
        costCodesByProject[project.ProjectID.toString()] = mockCostCodes;
      });
      setCostCodes(costCodesByProject);
    } catch (error) {
      toast.error("Failed to load cost codes");
    }
  };

  const loadProjectExtras = async (projectId: number) => {
    try {
      // Mock data for now - replace with actual API call
      const mockExtras: ProjectExtra[] = [
        { ExtraID: 1, ExtraValue: "Phase 1", Description: "Foundation Work" },
        { ExtraID: 2, ExtraValue: "Phase 2", Description: "Structural Work" },
        { ExtraID: 3, ExtraValue: "Phase 3", Description: "Finishing Work" }
      ];
      
      setProjectExtras(prev => ({
        ...prev,
        [projectId.toString()]: mockExtras
      }));
    } catch (error) {
      toast.error("Failed to load project extras");
    }
  };

  const validateEntry = (entry: EntryFormData): { [key: string]: string } => {
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

    if (overtimeHours < 0) {
      errors.overtimeHours = "Overtime hours cannot be negative";
    }

    if (totalHours === 0) {
      errors.hours = "Total hours must be greater than 0";
    }

    if (totalHours > 24) {
      errors.hours = "Total hours cannot exceed 24 per day";
    }

    return errors;
  };

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value };
        
        // Clear related fields when project changes
        if (field === 'projectID') {
          updatedEntry.extraID = "";
          updatedEntry.costCodeID = "";
          
          // Load extras for new project
          if (value) {
            loadProjectExtras(parseInt(value));
          }
        }
        
        // Clear validation errors for the changed field
        const newErrors = { ...updatedEntry.errors };
        delete newErrors[field];
        if (field === 'standardHours' || field === 'overtimeHours') {
          delete newErrors.hours;
        }
        updatedEntry.errors = newErrors;
        
        return updatedEntry;
      }
      return entry;
    }));
  };

  const addEntry = () => {
    const newEntry: EntryFormData = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      projectID: "",
      extraID: "",
      costCodeID: "",
      standardHours: "",
      overtimeHours: "",
      notes: "",
      errors: {}
    };
    setEntries([...entries, newEntry]);
  };

  const copyLastEntry = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const newEntry: EntryFormData = {
        ...lastEntry,
        id: Math.max(...entries.map(e => e.id)) + 1,
        date: new Date().toISOString().split('T')[0],
        standardHours: "",
        overtimeHours: "",
        notes: "",
        errors: {}
      };
      setEntries([...entries, newEntry]);
      toast.success("Copied last entry settings");
    }
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const setQuickHours = (entryId: number, hours: number) => {
    updateEntry(entryId, 'standardHours', hours.toString());
  };

  const handleSubmit = async () => {
    if (!user) return;

    // Validate all entries
    let hasErrors = false;
    const validatedEntries = entries.map(entry => {
      const errors = validateEntry(entry);
      hasErrors = hasErrors || Object.keys(errors).length > 0;
      return { ...entry, errors };
    });

    setEntries(validatedEntries);

    if (hasErrors) {
      toast.error("Please fix validation errors before submitting");
      return;
    }

    try {
      setLoading(true);
      
      // Convert form data to API format with correct property names
      const apiEntries: Omit<TimesheetEntry, 'EntryID'>[] = validatedEntries.map(entry => ({
        EmployeeID: user.employeeId,
        DateWorked: entry.date,
        ProjectID: parseInt(entry.projectID),
        ExtraID: entry.extraID ? parseInt(entry.extraID) : undefined,
        CostCodeID: parseInt(entry.costCodeID),
        StandardHours: parseFloat(entry.standardHours) || 0,
        OvertimeHours: parseFloat(entry.overtimeHours) || 0,
        Notes: entry.notes || undefined,
        Status: 'Draft'
      }));

      // Submit all entries
      for (const entry of apiEntries) {
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
              <CardTitle className="text-white flex items-center justify-between">
                Entry #{entry.id}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {entry.date}
                  </Badge>
                  {entries.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date and Employee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`date-${entry.id}`} className="text-gray-300">Date *</Label>
                  <Input
                    id={`date-${entry.id}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                    className={`bg-white/10 border-white/20 text-white ${
                      entry.errors.date ? 'border-red-400' : ''
                    }`}
                  />
                  {entry.errors.date && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {entry.errors.date}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300">Employee</Label>
                  <Input
                    value={user?.fullName || ''}
                    disabled
                    className="bg-white/5 border-white/10 text-gray-400"
                  />
                </div>
              </div>

              {/* Project Selection */}
              <div>
                <Label className="text-gray-300">Project *</Label>
                <Select 
                  value={entry.projectID} 
                  onValueChange={(value) => updateEntry(entry.id, 'projectID', value)}
                >
                  <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
                    entry.errors.projectID ? 'border-red-400' : ''
                  }`}>
                    <SelectValue placeholder="Select project..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.ProjectID} value={project.ProjectID.toString()}>
                        {project.ProjectCode} - {project.ProjectDescription}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {entry.errors.projectID && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {entry.errors.projectID}
                  </p>
                )}
              </div>

              {/* Project Extra and Cost Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Phase/Extra</Label>
                  <Select 
                    value={entry.extraID} 
                    onValueChange={(value) => updateEntry(entry.id, 'extraID', value)}
                    disabled={!entry.projectID}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select phase..." />
                    </SelectTrigger>
                    <SelectContent>
                      {projectExtras[entry.projectID]?.map((extra) => (
                        <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                          {extra.ExtraValue} - {extra.Description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Cost Code *</Label>
                  <Select 
                    value={entry.costCodeID} 
                    onValueChange={(value) => updateEntry(entry.id, 'costCodeID', value)}
                    disabled={!entry.projectID}
                  >
                    <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
                      entry.errors.costCodeID ? 'border-red-400' : ''
                    }`}>
                      <SelectValue placeholder="Select cost code..." />
                    </SelectTrigger>
                    <SelectContent>
                      {costCodes[entry.projectID]?.map((code) => (
                        <SelectItem key={code.CostCodeID} value={code.CostCodeID.toString()}>
                          {code.CostCode} - {code.Description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {entry.errors.costCodeID && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {entry.errors.costCodeID}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`standard-${entry.id}`} className="text-gray-300">Standard Hours</Label>
                  <Input
                    id={`standard-${entry.id}`}
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    value={entry.standardHours}
                    onChange={(e) => updateEntry(entry.id, 'standardHours', e.target.value)}
                    className={`bg-white/10 border-white/20 text-white ${
                      entry.errors.standardHours || entry.errors.hours ? 'border-red-400' : ''
                    }`}
                    placeholder="8.0"
                  />
                  {entry.errors.standardHours && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {entry.errors.standardHours}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`overtime-${entry.id}`} className="text-gray-300">Overtime Hours</Label>
                  <Input
                    id={`overtime-${entry.id}`}
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    value={entry.overtimeHours}
                    onChange={(e) => updateEntry(entry.id, 'overtimeHours', e.target.value)}
                    className={`bg-white/10 border-white/20 text-white ${
                      entry.errors.overtimeHours || entry.errors.hours ? 'border-red-400' : ''
                    }`}
                    placeholder="0.0"
                  />
                  {entry.errors.overtimeHours && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {entry.errors.overtimeHours}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours validation error */}
              {entry.errors.hours && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {entry.errors.hours}
                </p>
              )}

              {/* Quick Hour Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 8)}
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  8 hrs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 10)}
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                >
                  10 hrs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 12)}
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  12 hrs
                </Button>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor={`notes-${entry.id}`} className="text-gray-300">Notes</Label>
                <Textarea
                  id={`notes-${entry.id}`}
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Add any additional notes..."
                  rows={3}
                  maxLength={500}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Actions */}
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
    </div>
  );
};

export default EnhancedTimeEntryForm;
