
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, AlertTriangle } from 'lucide-react';

interface HoursEntryRowProps {
  standardHours: string;
  setStandardHours: (value: string) => void;
  overtimeHours: string;
  setOvertimeHours: (value: string) => void;
  totalHours: number;
  setQuickHours: (hours: number) => void;
}

const HoursEntryRow: React.FC<HoursEntryRowProps> = ({
  standardHours,
  setStandardHours,
  overtimeHours,
  setOvertimeHours,
  totalHours,
  setQuickHours
}) => {
  const standardValue = parseFloat(standardHours) || 0;
  const overtimeValue = parseFloat(overtimeHours) || 0;
  
  const standardError = standardValue < 0 ? 'Cannot be negative' : standardValue > 16 ? 'Cannot exceed 16 hours' : '';
  const overtimeError = overtimeValue < 0 ? 'Cannot be negative' : overtimeValue > 16 ? 'Cannot exceed 16 hours' : '';
  const totalError = totalHours > 16 ? 'Total cannot exceed 16 hours' : '';

  const handleStandardChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0 && numValue <= 16) {
      setStandardHours(value);
    }
  };

  const handleOvertimeChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0 && numValue <= 16) {
      setOvertimeHours(value);
    }
  };

  const handleQuickHours = (hours: number) => {
    if (hours <= 16) {
      setQuickHours(hours);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Standard Hours */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded px-4 py-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">ST:</span>
            <Input
              type="number"
              step="0.25"
              min="0"
              max="16"
              value={standardHours}
              onChange={(e) => handleStandardChange(e.target.value)}
              className={`w-16 text-center border-emerald-300 dark:border-emerald-700 ${
                standardError ? 'border-red-500' : ''
              }`}
              placeholder="8.0"
            />
            <span className="text-sm text-emerald-600 dark:text-emerald-400">hrs</span>
          </div>
        </div>

        {/* Overtime Hours */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded px-4 py-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="text-sm text-amber-800 dark:text-amber-300 font-medium">OT:</span>
            <Input
              type="number"
              step="0.25"
              min="0"
              max="16"
              value={overtimeHours}
              onChange={(e) => handleOvertimeChange(e.target.value)}
              className={`w-16 text-center border-amber-300 dark:border-amber-700 ${
                overtimeError ? 'border-red-500' : ''
              }`}
              placeholder="0.0"
            />
            <span className="text-sm text-amber-600 dark:text-amber-400">hrs</span>
          </div>
        </div>

        {/* Total Hours Display */}
        <div className={`border-2 rounded px-4 py-2 ${
          totalError 
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
        }`}>
          <span className={`text-sm font-medium ${
            totalError 
              ? 'text-red-800 dark:text-red-300' 
              : 'text-blue-800 dark:text-blue-300'
          }`}>
            Total: {totalHours.toFixed(1)}h
          </span>
        </div>

        <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

        {/* Quick Fill Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">Quick:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickHours(4)}
            className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
          >
            4h
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickHours(8)}
            className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
          >
            8h
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickHours(10)}
            className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
          >
            10h
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickHours(12)}
            className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
          >
            12h
          </Button>
        </div>
      </div>

      {/* Error Messages */}
      {(standardError || overtimeError || totalError) && (
        <div className="space-y-1">
          {standardError && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Standard hours: {standardError}
            </p>
          )}
          {overtimeError && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Overtime hours: {overtimeError}
            </p>
          )}
          {totalError && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {totalError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HoursEntryRow;
