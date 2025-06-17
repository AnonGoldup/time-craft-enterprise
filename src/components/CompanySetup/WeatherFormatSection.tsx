import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const WeatherFormatSection: React.FC = () => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-primary">Weather Format</h3>
      <div className="flex items-center justify-between">
        <Label>Select Weather Format:</Label>
        <RadioGroup defaultValue="celsius" className="flex flex-row gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fahrenheit" id="fahrenheit" />
            <Label htmlFor="fahrenheit">Fahrenheit</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="celsius" id="celsius" />
            <Label htmlFor="celsius">Celsius</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
