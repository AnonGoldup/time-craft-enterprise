
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectExtra } from '@/services/api';

interface ExtraSelectorProps {
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  projectExtras: ProjectExtra[];
  disabled: boolean;
}

const ExtraSelector: React.FC<ExtraSelectorProps> = ({
  selectedExtra,
  setSelectedExtra,
  projectExtras,
  disabled
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 border-2 border-green-500 rounded flex items-center justify-center">
        <span className="text-green-500 text-xs font-bold">E</span>
      </div>
      <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Extra:</span>
      <Select value={selectedExtra} onValueChange={setSelectedExtra} disabled={disabled}>
        <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
          <SelectValue placeholder="Select extra..." />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          {projectExtras.map((extra) => (
            <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
              {extra.ExtraValue} - {extra.Description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExtraSelector;
