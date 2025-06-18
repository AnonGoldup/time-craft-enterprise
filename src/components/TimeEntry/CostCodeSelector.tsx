
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CostCode } from '@/services/api';

interface CostCodeSelectorProps {
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  costCodes: CostCode[];
  disabled: boolean;
  useCostCodeInput?: boolean;
}

const CostCodeSelector: React.FC<CostCodeSelectorProps> = ({
  selectedCostCode,
  setSelectedCostCode,
  costCodes,
  disabled,
  useCostCodeInput = false
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-blue-500 rounded flex items-center justify-center">
          <span className="text-blue-500 text-xs font-bold">C</span>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400">Cost Code</span>
      </div>
      {useCostCodeInput ? (
        <Input 
          placeholder="Select code..." 
          value={selectedCostCode} 
          onChange={e => setSelectedCostCode(e.target.value)} 
          className="w-48 border-slate-300 dark:border-slate-600" 
        />
      ) : (
        <Select value={selectedCostCode} onValueChange={setSelectedCostCode} disabled={disabled}>
          <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="Select code..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {costCodes.map((code) => (
              <SelectItem key={code.costCodeID} value={code.costCodeID.toString()}>
                {code.costCode} - {code.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default CostCodeSelector;
