import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Save, 
  Clock, 
  Copy,
  Plus,
  Minus,
  Play,
  Pause
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuickEntryData {
  projectCode: string;
  projectName: string;
  costCode: string;
  costCodeName: string;
  timeIn: string;
  timeOut: string;
  breakIn?: string;
  breakOut?: string;
  notes?: string;
}

interface QuickEntryPanelProps {
  onClose: () => void;
  onSave: (entry: QuickEntryData) => void;
}

export const QuickEntryPanel: React.FC<QuickEntryPanelProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<QuickEntryData>({
    projectCode: '',
    projectName: '',
    costCode: '',
    costCodeName: '',
    timeIn: '',
    timeOut: '',
    notes: ''
  });

  const [recentCombinations] = useState([
    { projectCode: '25-0001', projectName: 'AltaPro Project Alpha', costCode: '001-040-041', costCodeName: 'INDIRECT LABOR' },
    { projectCode: '25-0001', projectName: 'AltaPro Project Alpha', costCode: '001-080-050', costCodeName: 'EQUIPMENT OPERATION' },
    { projectCode: '25-0002', projectName: 'Beta Construction', costCode: '002-010-020', costCodeName: 'SITE PREPARATION' },
  ]);

  const [quickTimes] = useState([
    { label: '8:00 AM', value: '08:00' },
    { label: '12:00 PM', value: '12:00' },
    { label: '1:00 PM', value: '13:00' },
    { label: '5:00 PM', value: '17:00' },
    { label: 'Now', value: new Date().toTimeString().slice(0, 5) },
  ]);

  const handleSave = () => {
    if (formData.projectCode && formData.costCode && formData.timeIn && formData.timeOut) {
      onSave(formData);
    }
  };

  const calculateDuration = () => {
    if (formData.timeIn && formData.timeOut) {
      const start = new Date(`2000-01-01T${formData.timeIn}`);
      const end = new Date(`2000-01-01T${formData.timeOut}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return diffHours > 0 ? `${diffHours.toFixed(1)}h` : 'Invalid';
    }
    return '';
  };

  const selectRecentCombination = (combination: typeof recentCombinations[0]) => {
    setFormData(prev => ({
      ...prev,
      projectCode: combination.projectCode,
      projectName: combination.projectName,
      costCode: combination.costCode,
      costCodeName: combination.costCodeName
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Time Entry
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Recent Combinations */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Recent Project/Cost Code Combinations</Label>
            <div className="grid grid-cols-1 gap-2">
              {recentCombinations.map((combo, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => selectRecentCombination(combo)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Badge variant="outline" className="font-mono text-xs">
                      {combo.projectCode}
                    </Badge>
                    <span className="font-medium truncate">{combo.projectName}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="secondary" className="font-mono text-xs">
                      {combo.costCode}
                    </Badge>
                    <span className="text-sm text-muted-foreground truncate">{combo.costCodeName}</span>
                    <Copy className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Manual Entry Form */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectCode">Project Code</Label>
              <Input
                id="projectCode"
                value={formData.projectCode}
                onChange={(e) => setFormData(prev => ({ ...prev, projectCode: e.target.value }))}
                placeholder="25-0001"
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                placeholder="Project Alpha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costCode">Cost Code</Label>
              <Input
                id="costCode"
                value={formData.costCode}
                onChange={(e) => setFormData(prev => ({ ...prev, costCode: e.target.value }))}
                placeholder="001-040-041"
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costCodeName">Cost Code Name</Label>
              <Input
                id="costCodeName"
                value={formData.costCodeName}
                onChange={(e) => setFormData(prev => ({ ...prev, costCodeName: e.target.value }))}
                placeholder="INDIRECT LABOR"
              />
            </div>
          </div>

          <Separator />

          {/* Time Entry */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Time Period</Label>
              {calculateDuration() && (
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {calculateDuration()}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeIn" className="flex items-center gap-1">
                  <Play className="h-3 w-3 text-green-600" />
                  Time In
                </Label>
                <Input
                  id="timeIn"
                  type="time"
                  value={formData.timeIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeIn: e.target.value }))}
                />
                <div className="flex gap-1">
                  {quickTimes.map((time) => (
                    <Button
                      key={time.label}
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => setFormData(prev => ({ ...prev, timeIn: time.value }))}
                    >
                      {time.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOut" className="flex items-center gap-1">
                  <Pause className="h-3 w-3 text-red-600" />
                  Time Out
                </Label>
                <Input
                  id="timeOut"
                  type="time"
                  value={formData.timeOut}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeOut: e.target.value }))}
                />
                <div className="flex gap-1">
                  {quickTimes.map((time) => (
                    <Button
                      key={time.label}
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6 px-2"
                      onClick={() => setFormData(prev => ({ ...prev, timeOut: time.value }))}
                    >
                      {time.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => console.log('Save as template')}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Save Template
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!formData.projectCode || !formData.costCode || !formData.timeIn || !formData.timeOut}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Entry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};