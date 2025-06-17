
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const InputFormsSection: React.FC = () => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-blue-600">Input Forms</h3>
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
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-blue-600">Output Forms</h3>
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
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-blue-600">Reports</h3>
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
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium text-blue-600">Color</h3>
      <div className="space-y-2">
        <Label className="text-red-500">Color Theme:</Label>
        <RadioGroup defaultValue="belize-hole" className="space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="belize-hole" id="belize-hole" />
            <div className="w-5 h-5 bg-blue-600 rounded"></div>
            <Label htmlFor="belize-hole">BELIZE HOLE</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="amethyst" id="amethyst" />
            <div className="w-5 h-5 bg-purple-600 rounded"></div>
            <Label htmlFor="amethyst">AMETHYST</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="alizarin" id="alizarin" />
            <div className="w-5 h-5 bg-red-600 rounded"></div>
            <Label htmlFor="alizarin">ALIZARIN</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="carrot" id="carrot" />
            <div className="w-5 h-5 bg-orange-500 rounded"></div>
            <Label htmlFor="carrot">CARROT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="casablanca" id="casablanca" />
            <div className="w-5 h-5 bg-yellow-400 rounded"></div>
            <Label htmlFor="casablanca">CASABLANCA</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export const HierarchyLoginSection: React.FC = () => {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium">Hierarchy/Login Settings</h3>
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
