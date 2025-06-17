
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const InputFormsSection: React.FC = () => {
  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-blue-600 mb-2">Input Forms</h3>
      <div className="flex items-center justify-between">
        <Label className="text-red-500">Display Pay Rate With Labor Class:</Label>
        <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pay-rate-yes" />
            <Label htmlFor="pay-rate-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pay-rate-no" />
            <Label htmlFor="pay-rate-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export const OutputFormsSection: React.FC = () => {
  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-blue-600 mb-2">Output Forms</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-red-500">Track Contract Number:</Label>
          <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="track-contract-yes" />
              <Label htmlFor="track-contract-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="track-contract-no" />
              <Label htmlFor="track-contract-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-red-500">Force 'Print Preview' On Display Of Output Forms:</Label>
          <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="print-preview-yes" />
              <Label htmlFor="print-preview-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="print-preview-no" />
              <Label htmlFor="print-preview-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export const ReportsSection: React.FC = () => {
  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-blue-600 mb-2">Reports</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-red-500">Labor Unit Productivity - Default Unit Tracking:</Label>
          <RadioGroup defaultValue="units-per-hour" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="units-per-hour" id="units-per-hour" />
              <Label htmlFor="units-per-hour">Units per Hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hours-per-unit" id="hours-per-unit" />
              <Label htmlFor="hours-per-unit">Hours per Unit</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-red-500">Labor Unit Productivity - Include Units Per Day:</Label>
          <div className="flex items-center gap-4">
            <RadioGroup defaultValue="yes" className="flex flex-row gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="units-per-day-yes" />
                <Label htmlFor="units-per-day-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="units-per-day-no" />
                <Label htmlFor="units-per-day-no">No</Label>
              </div>
            </RadioGroup>
            <span className="text-sm text-red-400">Calculated based on 8 hour day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ColorSection: React.FC = () => {
  const colorThemes = [
    { id: 'belize-hole', name: 'BELIZE HOLE', color: 'bg-blue-600', hex: '#2563eb' },
    { id: 'amethyst', name: 'AMETHYST', color: 'bg-purple-600', hex: '#9333ea' },
    { id: 'alizarin', name: 'ALIZARIN', color: 'bg-red-600', hex: '#dc2626' },
    { id: 'carrot', name: 'CARROT', color: 'bg-orange-500', hex: '#f97316' },
    { id: 'casablanca', name: 'CASABLANCA', color: 'bg-yellow-400', hex: '#facc15' },
    { id: 'pigment-green', name: 'PIGMENT GREEN', color: 'bg-green-600', hex: '#16a34a' },
    { id: 'emerald', name: 'EMERALD', color: 'bg-emerald-500', hex: '#10b981' },
    { id: 'turquoise', name: 'TURQUOISE', color: 'bg-cyan-500', hex: '#06b6d4' },
    { id: 'midnight', name: 'MIDNIGHT', color: 'bg-slate-800', hex: '#1e293b' },
    { id: 'silver', name: 'SILVER', color: 'bg-gray-400', hex: '#9ca3af' },
    { id: 'charcoal', name: 'CHARCOAL', color: 'bg-gray-700', hex: '#374151' },
    { id: 'rose', name: 'ROSE', color: 'bg-rose-500', hex: '#f43f5e' },
  ];

  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-blue-600 mb-2">Color</h3>
      <div>
        <Label className="text-red-500 mb-3 block">Color Theme:</Label>
        <RadioGroup defaultValue="belize-hole" className="grid grid-cols-2 gap-2">
          {colorThemes.map((theme) => (
            <div key={theme.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
              <RadioGroupItem value={theme.id} id={theme.id} />
              <div className={`w-6 h-6 ${theme.color} rounded border border-gray-300`} title={theme.hex}></div>
              <Label htmlFor={theme.id} className="text-sm font-medium cursor-pointer flex-1">
                {theme.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export const HierarchyLoginSection: React.FC = () => {
  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium mb-2">Hierarchy/Login Settings</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Number Project by Division:</Label>
          <RadioGroup defaultValue="no" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="division-yes" />
              <Label htmlFor="division-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="division-no" />
              <Label htmlFor="division-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-between">
          <Label>Top Hierarchy Level:</Label>
          <RadioGroup defaultValue="occupancy" className="flex flex-row gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="division" id="hierarchy-division" />
              <Label htmlFor="hierarchy-division">Division</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="occupancy" id="hierarchy-occupancy" />
              <Label htmlFor="hierarchy-occupancy">Occupancy Type</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="project" id="hierarchy-project" />
              <Label htmlFor="hierarchy-project">Project</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
