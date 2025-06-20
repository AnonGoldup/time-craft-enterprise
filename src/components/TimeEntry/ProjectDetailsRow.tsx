import React, { useState, useEffect, useMemo } from 'react';
import { ProjectSelector } from './ProjectSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { api } from '@/services/api';

interface ProjectExtra {
  extraId: number;
  projectId: number;
  extraValue: string;
  description?: string;
  isActive: boolean;
}

interface CostCode {
  costCodeId: number;
  costCode: string;
  description?: string;
  costCodeForSAGE?: string;
  isActive: boolean;
}

interface ProjectCostCodeMapping {
  mappingId: number;
  projectId: number;
  extraId?: number;
  costCodeId: number;
  isActive: boolean;
}

interface TimeEntry {
  entryId?: number;
  employeeId: string;
  dateWorked: Date;
  projectId: number;
  extraId?: number;
  costCodeId: number;
  payId: number;
  hours: number;
  notes?: string;
}

interface ProjectDetailsRowProps {
  entry: TimeEntry;
  onChange: (field: keyof TimeEntry, value: any) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const ProjectDetailsRow: React.FC<ProjectDetailsRowProps> = ({
  entry,
  onChange,
  onDelete,
  disabled = false
}) => {
  const [extras, setExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [mappings, setMappings] = useState<ProjectCostCodeMapping[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch project-related data when project changes
  useEffect(() => {
    if (entry.projectId) {
      fetchProjectData(entry.projectId);
    } else {
      // Reset dependent fields
      setExtras([]);
      setCostCodes([]);
      setMappings([]);
    }
  }, [entry.projectId]);

  // Filter available cost codes based on selected extra
  const availableCostCodes = useMemo(() => {
    if (!mappings.length) return [];

    return mappings
      .filter(m => 
        m.projectId === entry.projectId && 
        (m.extraId === entry.extraId || (!m.extraId && !entry.extraId)) &&
        m.isActive
      )
      .map(m => costCodes.find(cc => cc.costCodeId === m.costCodeId))
      .filter(Boolean) as CostCode[];
  }, [mappings, costCodes, entry.projectId, entry.extraId]);

  const fetchProjectData = async (projectId: number) => {
    try {
      setLoading(true);
      
      // Fetch all related data in parallel
      const [extrasRes, mappingsRes] = await Promise.all([
        api.get(`/projects/${projectId}/extras`),
        api.get(`/projects/${projectId}/cost-code-mappings`)
      ]);

      setExtras(extrasRes.data.filter((e: ProjectExtra) => e.isActive));
      setMappings(mappingsRes.data.filter((m: ProjectCostCodeMapping) => m.isActive));

      // Extract unique cost codes from mappings
      const uniqueCostCodeIds = [...new Set(mappingsRes.data.map((m: ProjectCostCodeMapping) => m.costCodeId))];
      const costCodesRes = await api.get(`/cost-codes?ids=${uniqueCostCodeIds.join(',')}`);
      setCostCodes(costCodesRes.data);

      // Reset cost code if it's not available for the new project
      if (!mappingsRes.data.some((m: ProjectCostCodeMapping) => 
        m.costCodeId === entry.costCodeId && 
        m.projectId === projectId
      )) {
        onChange('costCodeId', 0);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectChange = (projectId: number) => {
    onChange('projectId', projectId);
    // Reset dependent fields
    onChange('extraId', undefined);
    onChange('costCodeId', 0);
  };

  const handleExtraChange = (extraId: string) => {
    const numericId = extraId ? parseInt(extraId, 10) : undefined;
    onChange('extraId', numericId);
    
    // Reset cost code if it's not available for the new extra
    const newAvailableCodes = mappings
      .filter(m => 
        m.projectId === entry.projectId && 
        m.extraId === numericId &&
        m.isActive
      )
      .map(m => m.costCodeId);

    if (!newAvailableCodes.includes(entry.costCodeId)) {
      onChange('costCodeId', 0);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 items-center p-2 border-b">
      {/* Project Selector - 3 columns */}
      <div className="col-span-3">
        <ProjectSelector
          value={entry.projectId}
          onChange={(id) => handleProjectChange(id)}
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Extra Selector - 2 columns */}
      <div className="col-span-2">
        <Select
          value={entry.extraId?.toString() || ''}
          onValueChange={handleExtraChange}
          disabled={disabled || !entry.projectId || loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select extra (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {extras.map((extra) => (
              <SelectItem 
                key={extra.extraId} 
                value={extra.extraId.toString()}
              >
                {extra.extraValue} - {extra.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cost Code Selector - 3 columns */}
      <div className="col-span-3">
        <Select
          value={entry.costCodeId?.toString() || ''}
          onValueChange={(value) => onChange('costCodeId', parseInt(value, 10))}
          disabled={disabled || !entry.projectId || loading || !availableCostCodes.length}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select cost code" />
          </SelectTrigger>
          <SelectContent>
            {availableCostCodes.map((code) => (
              <SelectItem 
                key={code.costCodeId} 
                value={code.costCodeId.toString()}
              >
                {code.costCode} - {code.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hours Input - 2 columns */}
      <div className="col-span-2">
        <Input
          type="number"
          value={entry.hours || ''}
          onChange={(e) => onChange('hours', parseFloat(e.target.value) || 0)}
          placeholder="Hours"
          min="0"
          max="24"
          step="0.25"
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Delete Button - 1 column */}
      <div className="col-span-1 text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={disabled}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
