import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const PrintingSection: React.FC = () => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-primary">Printing</h3>
      <div className="flex items-center justify-between">
        <Label>Print Letterhead on the First Page Only:</Label>
        <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="letterhead-yes" />
            <Label htmlFor="letterhead-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="letterhead-no" />
            <Label htmlFor="letterhead-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
