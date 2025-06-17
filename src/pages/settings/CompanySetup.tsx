
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2 } from 'lucide-react';
import { GeneralTabContent } from '@/components/CompanySetup/GeneralTabContent';
import { PlaceholderTabContent } from '@/components/CompanySetup/PlaceholderTabContent';

const CompanySetup = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Setup</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure your company information and system preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rfis">RFIs</TabsTrigger>
          <TabsTrigger value="cors">CORs</TabsTrigger>
          <TabsTrigger value="subs">SUBs</TabsTrigger>
          <TabsTrigger value="pos">POs</TabsTrigger>
          <TabsTrigger value="pas">PAs</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="letterhead">Letterhead</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <GeneralTabContent />
        </TabsContent>

        <TabsContent value="rfis" className="space-y-6">
          <PlaceholderTabContent 
            title="RFI Configuration" 
            description="Configure RFI (Request for Information) settings" 
          />
        </TabsContent>

        <TabsContent value="cors" className="space-y-6">
          <PlaceholderTabContent 
            title="COR Configuration" 
            description="Configure Change Order Request settings" 
          />
        </TabsContent>

        <TabsContent value="subs" className="space-y-6">
          <PlaceholderTabContent 
            title="Subcontractor Configuration" 
            description="Configure subcontractor management settings" 
          />
        </TabsContent>

        <TabsContent value="pos" className="space-y-6">
          <PlaceholderTabContent 
            title="Purchase Order Configuration" 
            description="Configure PO (Purchase Order) settings" 
          />
        </TabsContent>

        <TabsContent value="pas" className="space-y-6">
          <PlaceholderTabContent 
            title="Pay Application Configuration" 
            description="Configure PA (Pay Application) settings" 
          />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <PlaceholderTabContent 
            title="Log Configuration" 
            description="Configure logging and reporting settings" 
          />
        </TabsContent>

        <TabsContent value="letterhead" className="space-y-6">
          <PlaceholderTabContent 
            title="Letterhead Configuration" 
            description="Configure company letterhead and branding" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySetup;
