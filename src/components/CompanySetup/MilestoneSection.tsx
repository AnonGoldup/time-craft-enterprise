import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const MilestoneSection: React.FC = () => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-primary">Milestone</h3>
      <div className="flex items-center justify-between">
        <Label>Search by phase:</Label>
        <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="search-phase-yes" />
            <Label htmlFor="search-phase-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="search-phase-no" />
            <Label htmlFor="search-phase-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
