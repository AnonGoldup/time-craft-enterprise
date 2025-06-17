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
            <CardContent className="space-y-6">
              {/* Company Details Section */}
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

              {/* Milestone Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Milestone</h3>
                <div className="flex items-center justify-between">
                  <Label className="text-red-500">Search by phase:</Label>
                  <RadioGroup defaultValue="yes">
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

              {/* Weather Format Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Weather Format</h3>
                <div className="flex items-center justify-between">
                  <Label className="text-red-500">Select Weather Format:</Label>
                  <RadioGroup defaultValue="celsius">
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

              {/* Printing Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Printing</h3>
                <div className="flex items-center justify-between">
                  <Label className="text-red-500">Print Letterhead on the First Page Only:</Label>
                  <RadioGroup defaultValue="yes">
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

              {/* Logs Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Logs</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-500">Display Hierarchy On Spreadsheet And Printer Versions Of Logs:</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="division" defaultChecked={false} />
                        <Label htmlFor="division">Division</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="occupancy-type" defaultChecked={true} />
                        <Label htmlFor="occupancy-type">Occupancy Type</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">Daily Report Log Default Sort:</Label>
                        <RadioGroup defaultValue="pr-date">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="pr-no" id="daily-pr-no" />
                            <Label htmlFor="daily-pr-no" className="text-sm">PR No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="pr-date" id="daily-pr-date" />
                            <Label htmlFor="daily-pr-date" className="text-sm">PR Date</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">RFI Log Default Sort:</Label>
                        <RadioGroup defaultValue="rfi-no">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="rfi-no" id="rfi-no" />
                            <Label htmlFor="rfi-no" className="text-sm">RFI No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="rfi-date" id="rfi-date" />
                            <Label htmlFor="rfi-date" className="text-sm">RFI Date</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">COR Log Default Sort:</Label>
                        <RadioGroup defaultValue="cor-no">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="cor-no" id="cor-no" />
                            <Label htmlFor="cor-no" className="text-sm">COR No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="cor-date" id="cor-date" />
                            <Label htmlFor="cor-date" className="text-sm">COR Date</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="other-ref" id="other-ref" />
                            <Label htmlFor="other-ref" className="text-sm">Other Ref No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">Submittal Log Default Sort:</Label>
                        <RadioGroup defaultValue="trans-no">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="sub-no" id="sub-no" />
                            <Label htmlFor="sub-no" className="text-sm">Sub No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="trans-no" id="trans-no" />
                            <Label htmlFor="trans-no" className="text-sm">Trans No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="status" id="status" />
                            <Label htmlFor="status" className="text-sm">Status</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="date-sent" id="date-sent" />
                            <Label htmlFor="date-sent" className="text-sm">Date Sent</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">PO Log Default Sort:</Label>
                        <RadioGroup defaultValue="po-no">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="po-no" id="po-no" />
                            <Label htmlFor="po-no" className="text-sm">PO No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="po-date" id="po-date" />
                            <Label htmlFor="po-date" className="text-sm">PO Date</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-red-500 text-sm">Pay App Log Default Sort:</Label>
                        <RadioGroup defaultValue="pa-no">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="pa-no" id="pa-no" />
                            <Label htmlFor="pa-no" className="text-sm">PA No</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="pa-date" id="pa-date" />
                            <Label htmlFor="pa-date" className="text-sm">PA Due Date</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="net-amt" id="net-amt" />
                            <Label htmlFor="net-amt" className="text-sm">Net Amt</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="amt-paid" id="amt-paid" />
                            <Label htmlFor="amt-paid" className="text-sm">Amt Paid</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="date-paid" id="date-paid" />
                            <Label htmlFor="date-paid" className="text-sm">Date Paid</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-red-500 text-sm">Drawing Set Log Default Sort:</Label>
                      <RadioGroup defaultValue="sheet-no">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="prefix" id="prefix" />
                          <Label htmlFor="prefix" className="text-sm">Prefix</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="sheet-no" id="sheet-no" />
                          <Label htmlFor="sheet-no" className="text-sm">Sheet No</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="seq-area" id="seq-area" />
                          <Label htmlFor="seq-area" className="text-sm">Seq/Area</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="description" id="description" />
                          <Label htmlFor="description" className="text-sm">Description</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-red-500 text-sm">Correspondence Log Default Sort:</Label>
                      <RadioGroup defaultValue="date">
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="number" id="corr-number" />
                          <Label htmlFor="corr-number" className="text-sm">Number</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="date" id="corr-date" />
                          <Label htmlFor="corr-date" className="text-sm">Date</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="to" id="corr-to" />
                          <Label htmlFor="corr-to" className="text-sm">To</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="subject" id="corr-subject" />
                          <Label htmlFor="corr-subject" className="text-sm">Subject</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="regarding" id="corr-regarding" />
                          <Label htmlFor="corr-regarding" className="text-sm">Regarding</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-500 text-sm">Meeting Minutes Log Default Sort:</Label>
                    <RadioGroup defaultValue="number">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="number" id="meeting-number" />
                        <Label htmlFor="meeting-number" className="text-sm">Number</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="subject" id="meeting-subject" />
                        <Label htmlFor="meeting-subject" className="text-sm">Subject</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="meeting-date" id="meeting-date" />
                        <Label htmlFor="meeting-date" className="text-sm">Meeting Date</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="prepared-by" id="prepared-by" />
                        <Label htmlFor="prepared-by" className="text-sm">Prepared By</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Input Forms Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Input Forms</h3>
                <div className="flex items-center justify-between">
                  <Label className="text-red-500">Display Pay Rate With Labor Class:</Label>
                  <RadioGroup defaultValue="yes">
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

              {/* Output Forms Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Output Forms</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-500">Track Contract Number:</Label>
                    <RadioGroup defaultValue="yes">
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
                    <RadioGroup defaultValue="yes">
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

              {/* Reports Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Reports</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-500">Labor Unit Productivity - Default Unit Tracking:</Label>
                    <RadioGroup defaultValue="units-per-hour">
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
                      <RadioGroup defaultValue="yes">
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

              {/* Color Section */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-blue-600">Color</h3>
                <div className="space-y-3">
                  <Label className="text-red-500">Color Theme:</Label>
                  <RadioGroup defaultValue="belize-hole">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belize-hole" id="belize-hole" />
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                      <Label htmlFor="belize-hole">BELIZE HOLE</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="amethyst" id="amethyst" />
                      <div className="w-6 h-6 bg-purple-600 rounded"></div>
                      <Label htmlFor="amethyst">AMETHYST</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alizarin" id="alizarin" />
                      <div className="w-6 h-6 bg-red-600 rounded"></div>
                      <Label htmlFor="alizarin">ALIZARIN</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="carrot" id="carrot" />
                      <div className="w-6 h-6 bg-orange-500 rounded"></div>
                      <Label htmlFor="carrot">CARROT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="casablanca" id="casablanca" />
                      <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                      <Label htmlFor="casablanca">CASABLANCA</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Hierarchy/Login Settings */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Hierarchy/Login Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Number Project by Division:</Label>
                    <RadioGroup defaultValue="no">
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
                    <RadioGroup defaultValue="occupancy">
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
