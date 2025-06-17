
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2 } from 'lucide-react';

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
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="AltaPro Electric Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address (line 1)</Label>
                  <Input id="addressLine1" defaultValue="13415 149 Street" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine2">Address (line 2)</Label>
                  <Input id="addressLine2" placeholder="Suite, unit, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Input id="county" defaultValue="AB" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Edmonton" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateProvince">State / Province</Label>
                  <Input id="stateProvince" defaultValue="AB" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">ZIP / Postal Code</Label>
                  <Input id="postalCode" defaultValue="T5L2T3" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="Canada" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="780-444-6510" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input id="fax" defaultValue="780-483-4073" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hierarchy/Login Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Number Project by Division:</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
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
                    <RadioGroup defaultValue="occupancy" className="flex gap-4">
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
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RFI Configuration</CardTitle>
              <CardDescription>Configure RFI (Request for Information) settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">RFI configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>COR Configuration</CardTitle>
              <CardDescription>Configure Change Order Request settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">COR configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subcontractor Configuration</CardTitle>
              <CardDescription>Configure subcontractor management settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Subcontractor configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Configuration</CardTitle>
              <CardDescription>Configure PO (Purchase Order) settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Purchase Order configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pay Application Configuration</CardTitle>
              <CardDescription>Configure PA (Pay Application) settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pay Application configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log Configuration</CardTitle>
              <CardDescription>Configure logging and reporting settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Log configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="letterhead" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Letterhead Configuration</CardTitle>
              <CardDescription>Configure company letterhead and branding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Letterhead configuration options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySetup;
