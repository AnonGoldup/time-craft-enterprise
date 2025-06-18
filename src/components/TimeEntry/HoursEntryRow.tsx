
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, AlertTriangle, Timer, Zap } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Hours Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Standard Hours */}
        <div className="space-y-3">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Standard Hours
                </label>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Regular work time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.25"
                min="0"
                max="16"
                value={standardHours}
                onChange={(e) => handleStandardChange(e.target.value)}
                className={`flex-1 text-center bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500 ${
                  standardError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="8.0"
              />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 min-w-[32px]">
                hrs
              </span>
            </div>
          </div>
        </div>

        {/* Overtime Hours */}
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Overtime Hours
                </label>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Extra work time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.25"
                min="0"
                max="16"
                value={overtimeHours}
                onChange={(e) => handleOvertimeChange(e.target.value)}
                className={`flex-1 text-center bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-amber-500 ${
                  overtimeError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="0.0"
              />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400 min-w-[32px]">
                hrs
              </span>
            </div>
          </div>
        </div>

        {/* Total Hours Display */}
        <div className="space-y-3">
          <div className={`rounded-lg p-4 border-2 ${
            totalError 
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                totalError 
                  ? 'bg-red-100 dark:bg-red-900/40' 
                  : 'bg-blue-100 dark:bg-blue-900/40'
              }`}>
                <Timer className={`h-4 w-4 ${
                  totalError 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-blue-600 dark:text-blue-400'
                }`} />
              </div>
              <div>
                <label className={`text-sm font-medium ${
                  totalError 
                    ? 'text-red-800 dark:text-red-300' 
                    : 'text-blue-800 dark:text-blue-300'
                }`}>
                  Total Hours
                </label>
                <p className={`text-xs ${
                  totalError 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-blue-600 dark:text-blue-400'
                }`}>
                  Combined time
                </p>
              </div>
            </div>
            <div className="text-center">
              <span className={`text-2xl font-bold ${
                totalError 
                  ? 'text-red-800 dark:text-red-300' 
                  : 'text-blue-800 dark:text-blue-300'
              }`}>
                {totalHours.toFixed(1)}
              </span>
              <span className={`text-sm font-medium ml-1 ${
                totalError 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                hrs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Fill Buttons */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Quick Fill:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[4, 6, 8, 10, 12].map((hours) => (
              <Button
                key={hours}
                variant="outline"
                size="sm"
                onClick={() => handleQuickHours(hours)}
                className="h-9 px-4 border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 transition-all"
              >
                {hours}h
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {(standardError || overtimeError || totalError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-800 dark:text-red-300">
              Please fix the following issues:
            </span>
          </div>
          {standardError && (
            <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2 ml-6">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              Standard hours: {standardError}
            </p>
          )}
          {overtimeError && (
            <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2 ml-6">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              Overtime hours: {overtimeError}
            </p>
          )}
          {totalError && (
            <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2 ml-6">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {totalError}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HoursEntryRow;
