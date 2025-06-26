import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, User2, Briefcase, Package2, FileText, Clock, AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { employeeApi, projectApi, timesheetApi } from "@/services/api";
import type { Employee, Project, ProjectExtra, CostCode } from "@/services/api";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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

const EnhancedTimeEntry = () => {
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
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-gray-700/50">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-blue-400" />
          Entry 1
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Project & Hours Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Project & Hours Details</h3>
          
          {/* Main fields row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Project */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-400" />
                Project
              </Label>
              <Select value={entry.projectCode} onValueChange={(value) => updateField('projectCode', value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-gray-100 hover:bg-gray-700/50 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select project..." />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
                      <span className="font-medium">{project.ProjectCode}</span>
                      <span className="text-gray-400 ml-2">{project.ProjectDescription}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Extra */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Package2 className="h-4 w-4 text-green-400" />
                Extra
              </Label>
              <Select 
                value={entry.extraId} 
                onValueChange={(value) => updateField('extraId', value)}
                disabled={!entry.projectCode}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-gray-100 hover:bg-gray-700/50 focus:ring-2 focus:ring-green-500 disabled:opacity-50">
                  <SelectValue placeholder="Select extra..." />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                {projectExtras.map((extra) => (
                    <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                      <span className="font-medium">{extra.ExtraValue}</span>
                      {extra.Description && <span className="text-gray-400 ml-2">{extra.Description}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cost Code */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-400" />
                Cost Code
              </Label>
              <Select 
                value={entry.costCode} 
                onValueChange={(value) => updateField('costCode', value)}
                disabled={!entry.projectCode}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-gray-100 hover:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 disabled:opacity-50">
                  <SelectValue placeholder="Select code..." />
                </SelectTrigger>
                <SelectContent>
                  {costCodes.map((code) => (
                    <SelectItem key={code.CostCode} value={code.CostCode}>
                      <span className="font-medium">{code.CostCode}</span>
                      <span className="text-gray-400 ml-2">{code.Description}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-orange-400" />
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-800/50 border-gray-600 text-gray-100 hover:bg-gray-700/50",
                      !entry.dateWorked && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {entry.dateWorked ? format(entry.dateWorked, "PPP") : <span>Select date...</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={entry.dateWorked}
                    onSelect={(date) => updateField('dateWorked', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Employee */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User2 className="h-4 w-4 text-cyan-400" />
                Employee
              </Label>
              <Select value={entry.employeeId} onValueChange={(value) => updateField('employeeId', value)}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-gray-100 hover:bg-gray-700/50 focus:ring-2 focus:ring-cyan-500">
                  <SelectValue placeholder="Select employee..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.EmployeeID} value={employee.EmployeeID}>
                      <span className="font-medium">{employee.FullName}</span>
                      <span className="text-gray-400 ml-2">({employee.EmployeeID})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hours section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Standard Hours */}
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-green-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Standard Hours
                  </Label>
                  <span className="text-xs text-green-400/70">Regular work time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.standardHours}
                    onChange={(e) => updateField('standardHours', e.target.value)}
                    className="bg-gray-800/50 border-green-500/30 text-2xl font-bold text-green-400 text-center"
                    placeholder="0.0"
                  />
                  <span className="text-green-400 font-medium">hrs</span>
                </div>
              </CardContent>
            </Card>

            {/* Overtime Hours */}
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-orange-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Overtime Hours
                  </Label>
                  <span className="text-xs text-orange-400/70">Extra work time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.5"
                    value={entry.overtimeHours}
                    onChange={(e) => updateField('overtimeHours', e.target.value)}
                    className="bg-gray-800/50 border-orange-500/30 text-2xl font-bold text-orange-400 text-center"
                    placeholder="0.0"
                  />
                  <span className="text-orange-400 font-medium">hrs</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Hours */}
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-blue-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Total Hours
                  </Label>
                  <span className="text-xs text-blue-400/70">Combined time</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-400">{totalHours.toFixed(1)}</span>
                  <span className="text-blue-400 font-medium ml-2">hrs</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick fill buttons */}
          <div className="flex items-center gap-2 mt-4">
            <Label className="text-sm text-gray-400 mr-2">Quick Fill:</Label>
            {[4, 6, 8, 10, 12].map((hours) => (
              <Button
                key={hours}
                variant="outline"
                size="sm"
                onClick={() => setQuickHours(hours)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {hours}h
              </Button>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold text-gray-100">Notes</Label>
          <Textarea
            value={entry.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-gray-100 min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any notes about this time entry..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={saving}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Entry
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTimeEntry;
