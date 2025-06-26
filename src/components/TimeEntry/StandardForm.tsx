import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Save, Send, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { employeeApi, projectApi, timesheetApi } from "@/services/api";
import type { Employee, Project, ProjectExtra, CostCode } from "@/services/api";

interface TimeEntry {
  id: number;
  dateWorked: string;
  employeeId: string;
  projectCode: string;
  extraId: string;
  costCode: string;
  standardHours: string;
  overtimeHours: string;
  notes: string;
  isNew?: boolean;
}

const StandardForm = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectExtras, setProjectExtras] = useState<Record<string, ProjectExtra[]>>({});
  const [costCodes, setCostCodes] = useState<Record<string, CostCode[]>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Load employees
      const empResponse = await employeeApi.getAll();
      setEmployees(empResponse.data.data);

      // Load projects
      const projResponse = await projectApi.getAll();
      setProjects(projResponse.data.data);

      // Add initial empty entry
      addEntry();
    } catch (error: any) {
      console.error('Error loading data:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to load initial data');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadProjectExtras = async (projectCode: string) => {
    try {
      const response = await projectApi.getExtras(projectCode);
      setProjectExtras(prev => ({
        ...prev,
        [projectCode]: response.data.data
      }));
    } catch (error) {
      console.error('Error loading project extras:', error);
    }
  };

  const loadCostCodes = async (projectCode: string, extraValue?: string) => {
    try {
      const response = await projectApi.getCostCodes(projectCode, extraValue);
      const key = `${projectCode}-${extraValue || 'default'}`;
      setCostCodes(prev => ({
        ...prev,
        [key]: response.data.data
      }));
    } catch (error) {
      console.error('Error loading cost codes:', error);
    }
  };

  const addEntry = () => {
    const newEntry: TimeEntry = {
      id: Date.now(),
      dateWorked: new Date().toISOString().split('T')[0],
      employeeId: user?.employeeId || '',
      projectCode: '',
      extraId: '',
      costCode: '',
      standardHours: '8',
      overtimeHours: '0',
      notes: '',
      isNew: true
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: number, field: keyof TimeEntry, value: string) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        
        // Handle cascading updates
        if (field === 'projectCode' && value) {
          // Load extras for this project
          loadProjectExtras(value);
          // Reset extra and cost code when project changes
          updated.extraId = '';
          updated.costCode = '';
        } else if (field === 'extraId' && updated.projectCode) {
          // Load cost codes for project + extra combination
          const extra = projectExtras[updated.projectCode]?.find(e => e.ExtraID.toString() === value);
          if (extra) {
            loadCostCodes(updated.projectCode, extra.ExtraValue);
          }
          // Reset cost code when extra changes
          updated.costCode = '';
        }
        
        return updated;
      }
      return entry;
    }));
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const copyLastEntry = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const newEntry: TimeEntry = {
        ...lastEntry,
        id: Date.now(),
        dateWorked: new Date().toISOString().split('T')[0],
        standardHours: '8',
        overtimeHours: '0',
        notes: '',
        isNew: true
      };
      setEntries([...entries, newEntry]);
      toast.success("Copied last entry settings");
    }
  };

  const setQuickHours = (entryId: number, hours: number) => {
    updateEntry(entryId, 'standardHours', hours.toString());
  };

  const handleSubmit = async (asDraft = false) => {
    setSaving(true);
    try {
      const entriesToSubmit = entries.filter(entry => 
        entry.projectCode && entry.costCode && entry.employeeId && 
        (parseFloat(entry.standardHours) > 0 || parseFloat(entry.overtimeHours) > 0)
      );

      if (entriesToSubmit.length === 0) {
        toast.error('No valid entries to submit');
        return;
      }

      for (const entry of entriesToSubmit) {
        const payload = {
          employeeId: entry.employeeId,
          dateWorked: entry.dateWorked,
          projectCode: entry.projectCode,
          extraId: entry.extraId || null,
          costCode: entry.costCode,
          standardHours: parseFloat(entry.standardHours) || 0,
          overtimeHours: parseFloat(entry.overtimeHours) || 0,
          notes: entry.notes,
          status: asDraft ? 'Draft' : 'Submitted'
        };

        await timesheetApi.create(payload);
      }

      toast.success(asDraft ? 'Draft saved successfully!' : 'Time entries submitted successfully!');
      
      // Reset form
      setEntries([]);
      addEntry();
    } catch (error: any) {
      console.error('Error submitting entries:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to submit entries');
      }
    } finally {
      setSaving(false);
    }
  };

  const getCurrentCostCodes = (entry: TimeEntry): CostCode[] => {
    if (!entry.projectCode) return [];
    
    const extra = entry.extraId && projectExtras[entry.projectCode]?.find(e => e.ExtraID.toString() === entry.extraId);
    const key = `${entry.projectCode}-${extra?.ExtraValue || 'default'}`;
    
    return costCodes[key] || [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Standard Time Entry</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={copyLastEntry} disabled={entries.length === 0}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Last
          </Button>
          <Button variant="outline" onClick={addEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center justify-between">
                <span>Entry #{index + 1}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {entry.dateWorked}
                  </Badge>
                  {entries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main entry row - all fields on one line */}
              <div className="grid grid-cols-5 gap-4">
                {/* Project */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Project</Label>
                  <Select 
                    value={entry.projectCode} 
                    onValueChange={(value) => updateEntry(entry.id, 'projectCode', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
                          {project.ProjectCode} - {project.ProjectDescription}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Extra */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Extra</Label>
                  <Select 
                    value={entry.extraId} 
                    onValueChange={(value) => updateEntry(entry.id, 'extraId', value)}
                    disabled={!entry.projectCode}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select extra..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Default</SelectItem>
                      {projectExtras[entry.projectCode]?.map((extra) => (
                        <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                          {extra.ExtraValue} - {extra.Description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cost Code */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Cost Code</Label>
                  <Select 
                    value={entry.costCode} 
                    onValueChange={(value) => updateEntry(entry.id, 'costCode', value)}
                    disabled={!entry.projectCode}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select cost code..." />
                    </SelectTrigger>
                    <SelectContent>
                      {getCurrentCostCodes(entry).map((code) => (
                        <SelectItem key={code.CostCode} value={code.CostCode}>
                          {code.CostCode} - {code.Description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Date</Label>
                  <Input
                    type="date"
                    value={entry.dateWorked}
                    onChange={(e) => updateEntry(entry.id, 'dateWorked', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                {/* Employee */}
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Employee</Label>
                  <Select 
                    value={entry.employeeId} 
                    onValueChange={(value) => updateEntry(entry.id, 'employeeId', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select employee..." />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.EmployeeID} value={employee.EmployeeID}>
                          {employee.FullName} ({employee.EmployeeID})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hours row */}
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Standard Hours</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.standardHours}
                    onChange={(e) => updateEntry(entry.id, 'standardHours', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="8.0"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1 block">Overtime Hours</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.overtimeHours}
                    onChange={(e) => updateEntry(entry.id, 'overtimeHours', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Quick hour buttons */}
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
                <Label className="text-gray-300 text-sm mb-1 block">Notes</Label>
                <Textarea
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Add any additional notes..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit actions */}
      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => handleSubmit(true)}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Draft
        </Button>
        <Button 
          onClick={() => handleSubmit(false)}
          disabled={saving}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Submit Entries
        </Button>
      </div>
    </div>
  );
};

export default StandardForm;
