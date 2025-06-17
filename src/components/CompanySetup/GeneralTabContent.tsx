
import React from 'react';
import { CompanyDetailsSection } from './CompanyDetailsSection';
import { MilestoneSection } from './MilestoneSection';
import { WeatherFormatSection } from './WeatherFormatSection';
import { PrintingSection } from './PrintingSection';
import { LogsSection } from './LogsSection';
import {
  InputFormsSection,
  OutputFormsSection,
  ReportsSection,
  ColorSection,
  HierarchyLoginSection
} from './ConfigurationSections';

export const GeneralTabContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <CompanyDetailsSection />
      <div className="space-y-4">
        <MilestoneSection />
        <WeatherFormatSection />
        <PrintingSection />
        <LogsSection />
        <InputFormsSection />
        <OutputFormsSection />
        <ReportsSection />
        <ColorSection />
        <HierarchyLoginSection />
      </div>
    </div>
  );
};
