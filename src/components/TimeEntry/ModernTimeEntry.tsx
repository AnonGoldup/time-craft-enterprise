import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User2, Briefcase, Package2, FileCode2, Clock, AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { employeeApi, projectApi, timesheetApi } from "@/services/api";
import type { Employee, Project, ProjectExtra, CostCode } from "@/services/api";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TimeEntryData {
  dateWorked: Date | undefined;
  employeeId: string;
  projectCode: string;
  extraId: string;
  costCode: string;
  standardHours: string;
  overtimeHours: string;
  notes: string;
}

const ModernTimeEntry = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form data
  const [entry, setEntry] = useState<TimeEntryData>({
    dateWorked: new Date(),
    employeeId: user?.employeeId || '',
    projectCode: '',
    extraId: 'default',
    costCode: '',
    standardHours: '8.0',
    overtimeHours: '0.0',
    notes: ''
  });

  // Reference data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectExtras, setProjectExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);

  // Calculate total hours
  const totalHours = (parseFloat(entry.standardHours) || 0) + (parseFloat(entry.overtimeHours) || 0);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load project-specific data when project changes
  useEffect(() => {
    if (entry.projectCode) {
      loadProjectData(entry.projectCode);
    }
  }, [entry.projectCode]);

  // Load cost codes when project or extra changes
  useEffect(() => {
    if (entry.projectCode) {
      loadCostCodes(entry.projectCode, entry.extraId);
    }
  }, [entry.projectCode, entry.extraId]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [empResponse, projResponse] = await Promise.all([
        employeeApi.getAll(),
        projectApi.getAll()
      ]);
      
      setEmployees(empResponse.data.data);
      setProjects(projResponse.data.data);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadProjectData = async (projectCode: string) => {
    try {
      const response = await projectApi.getExtras(projectCode);
      setProjectExtras(response.data.data);
      // Reset extra when project changes
      setEntry(prev => ({ ...prev, extraId: 'default', costCode: '' }));
    } catch (error) {
      console.error('Error loading project extras:', error);
      setProjectExtras([]);
    }
  };

  const loadCostCodes = async (projectCode: string, extraId?: string) => {
    try {
      const extra = extraId && extraId !== 'default' ? projectExtras.find(e => e.ExtraID.toString() === extraId) : null;
      const response = await projectApi.getCostCodes(projectCode, extra?.ExtraValue);
      setCostCodes(response.data.data);
      // Reset cost code when extra changes
      if (extraId !== entry.extraId) {
        setEntry(prev => ({ ...prev, costCode: '' }));
      }
    } catch (error) {
      console.error('Error loading cost codes:', error);
      setCostCodes([]);
    }
  };

  const updateField = (field: keyof TimeEntryData, value: any) => {
    setEntry(prev => ({ ...prev, [field]: value }));
  };

  const setQuickHours = (hours: number) => {
    updateField('standardHours', hours.toString());
  };

  const handleSubmit = async () => {
    // Validation
    if (!entry.projectCode || !entry.costCode || !entry.employeeId || !entry.dateWorked) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (totalHours <= 0) {
      toast.error('Total hours must be greater than 0');
      return;
    }

    if (totalHours > 24) {
      toast.error('Total hours cannot exceed 24 hours per day');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        employeeId: entry.employeeId,
        dateWorked: format(entry.dateWorked, 'yyyy-MM-dd'),
        projectCode: entry.projectCode,
        extraId: entry.extraId === 'default' ? null : entry.extraId || null,
        costCode: entry.costCode,
        standardHours: parseFloat(entry.standardHours) || 0,
        overtimeHours: parseFloat(entry.overtimeHours) || 0,
        notes: entry.notes,
        status: 'Draft'
      };

      await timesheetApi.create(payload);
      toast.success('Time entry submitted successfully!');
      
      // Reset form but keep employee and date
      setEntry({
        dateWorked: entry.dateWorked,
        employeeId: entry.employeeId,
        projectCode: '',
        extraId: 'default',
        costCode: '',
        standardHours: '8.0',
        overtimeHours: '0.0',
        notes: ''
      });
    } catch (error: any) {
      console.error('Error submitting entry:', error);
      toast.error(error.response?.data?.error || 'Failed to submit time entry');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="shadow-lg border-gray-200 bg-white">
        <CardHeader className="border-b bg-gray-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Entry 1</h2>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Project & Hours Details Section */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-4">Project & Hours Details</h3>
            
            {/* Main fields row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Project */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-blue-500" />
                  Project
                </Label>
                <Select value={entry.projectCode} onValueChange={(value) => updateField('projectCode', value)}>
                  <SelectTrigger className="h-10 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <SelectValue placeholder="Select project..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
                        <span className="font-medium">{project.ProjectCode}</span>
                        <span className="text-gray-500 ml-1 text-sm">{project.ProjectDescription}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Extra */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                  <Package2 className="h-3.5 w-3.5 text-green-500" />
                  Extra
                </Label>
                <Select 
                  value={entry.extraId} 
                  onValueChange={(value) => updateField('extraId', value)}
                  disabled={!entry.projectCode}
                >
                  <SelectTrigger className="h-10 bg-gray-50 border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-60">
                    <SelectValue placeholder="Select extra..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    {projectExtras.map((extra) => (
                      <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                        <span className="font-medium">{extra.ExtraValue}</span>
                        {extra.Description && <span className="text-gray-500 ml-1 text-sm">{extra.Description}</span>}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost Code */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                  <FileCode2 className="h-3.5 w-3.5 text-cyan-500" />
                  Cost Code
                </Label>
                <Select 
                  value={entry.costCode} 
                  onValueChange={(value) => updateField('costCode', value)}
                  disabled={!entry.projectCode}
                >
                  <SelectTrigger className="h-10 bg-gray-50 border-gray-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:opacity-60">
                    <SelectValue placeholder="Select code..." />
                  </SelectTrigger>
                  <SelectContent>
                    {costCodes.map((code) => (
                      <SelectItem key={code.CostCode} value={code.CostCode}>
                        <span className="font-medium">{code.CostCode}</span>
                        <span className="text-gray-500 ml-1 text-sm">{code.Description}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-purple-500" />
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-10 justify-start text-left font-normal bg-gray-50 border-gray-300 hover:bg-gray-100",
                        !entry.dateWorked && "text-gray-500"
                      )}
                    >
                      <Calendar className="mr-2 h-3.5 w-3.5 text-gray-400" />
                      {entry.dateWorked ? format(entry.dateWorked, "MM/dd/yyyy") : <span>Select date...</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={entry.dateWorked}
                      onSelect={(date) => updateField('dateWorked', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Employee */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                  <User2 className="h-3.5 w-3.5 text-indigo-500" />
                  Employee
                </Label>
                <Select value={entry.employeeId} onValueChange={(value) => updateField('employeeId', value)}>
                  <SelectTrigger className="h-10 bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <SelectValue placeholder="Select employee..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.EmployeeID} value={employee.EmployeeID}>
                        <span className="font-medium">{employee.FullName}</span>
                        <span className="text-gray-500 ml-1 text-sm">({employee.EmployeeID})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hours section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Standard Hours */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    Standard Hours
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mb-3">Regular work time</p>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.standardHours}
                    onChange={(e) => updateField('standardHours', e.target.value)}
                    className="text-2xl font-semibold text-center h-12 bg-white"
                    placeholder="0.0"
                  />
                  <span className="text-green-600 font-medium">hrs</span>
                </div>
              </div>

              {/* Overtime Hours */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    Overtime Hours
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mb-3">Extra work time</p>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.overtimeHours}
                    onChange={(e) => updateField('overtimeHours', e.target.value)}
                    className="text-2xl font-semibold text-center h-12 bg-white"
                    placeholder="0.0"
                  />
                  <span className="text-yellow-600 font-medium">hrs</span>
                </div>
              </div>

              {/* Total Hours */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Total Hours
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mb-3">Combined time</p>
                <div className="flex items-center justify-center h-12">
                  <span className="text-3xl font-bold text-blue-600">{totalHours.toFixed(1)}</span>
                  <span className="text-blue-600 font-medium ml-2">hrs</span>
                </div>
              </div>
            </div>

            {/* Quick fill buttons */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-500 font-medium mr-2">Quick Fill:</span>
              {[4, 6, 8, 10, 12].map((hours) => (
                <Button
                  key={hours}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(hours)}
                  className="h-8 px-3 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  {hours}h
                </Button>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-700">Notes</Label>
            <Textarea
              value={entry.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="min-h-[100px] resize-none bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Add any notes about this time entry..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              disabled={saving}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Entry
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernTimeEntry;
