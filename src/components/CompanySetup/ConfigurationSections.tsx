
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useColorTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

export const InputFormsSection: React.FC = () => {
  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-primary mb-2">Input Forms</h3>
      <div className="flex items-center justify-between">
        <Label>Display Pay Rate With Labor Class:</Label>
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
      <h3 className="text-lg font-medium text-primary mb-2">Output Forms</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Track Contract Number:</Label>
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
          <Label>Force 'Print Preview' On Display Of Output Forms:</Label>
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
      <h3 className="text-lg font-medium text-primary mb-2">Reports</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Labor Unit Productivity - Default Unit Tracking:</Label>
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
          <Label>Labor Unit Productivity - Include Units Per Day:</Label>
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
            <span className="text-sm text-muted-foreground">Calculated based on 8 hour day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ColorSection: React.FC = () => {
  const { currentTheme, setTheme, themes } = useColorTheme();
  const { toast } = useToast();
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem('selected-font') || 'Arial';
  });

  const availableFonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'PT Sans', label: 'PT Sans' }
  ];

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
  };

  const handleFontSave = () => {
    // Apply the font to the document
    document.documentElement.style.setProperty('--theme-font-family', selectedFont);
    document.body.style.fontFamily = selectedFont;
    
    // Save to localStorage
    localStorage.setItem('selected-font', selectedFont);
    
    // Show success toast
    toast({
      title: "Font Updated",
      description: `Font changed to ${selectedFont}`,
    });
  };

  return (
    <div className="border-t pt-3">
      <h3 className="text-lg font-medium text-primary mb-2">Color & Typography</h3>
      
      {/* Font Selector */}
      <div className="mb-4 p-4 border rounded-lg">
        <Label className="mb-3 block font-medium">Font Family:</Label>
        <div className="flex items-center gap-3">
          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFontSave} size="sm">
            Save Font
          </Button>
        </div>
      </div>

      {/* Color Theme Selector */}
      <div>
        <Label className="mb-3 block font-medium">Color Theme:</Label>
        <RadioGroup 
          value={currentTheme.id} 
          onValueChange={handleThemeChange}
          className="grid grid-cols-2 gap-2"
        >
          {themes.map((theme) => (
            <div key={theme.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted transition-colors">
              <RadioGroupItem value={theme.id} id={theme.id} />
              <div 
                className="w-8 h-8 rounded-lg border-2 border-border shadow-sm" 
                style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                title={theme.name}
              ></div>
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
      <h3 className="text-lg font-medium text-primary mb-2">Hierarchy/Login Settings</h3>
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
