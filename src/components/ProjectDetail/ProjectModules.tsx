
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

export const ProjectModules: React.FC = () => {
  // Sample data for charts
  const jobCostData = [
    { name: 'Labor', budget: 790303, actual: 1310277 },
    { name: 'Materials', budget: 2116497, actual: 2603067 },
    { name: 'Subcontracts', budget: 363237, actual: 75669 },
    { name: 'Equipment', budget: 3000, actual: 10496 },
    { name: 'Other', budget: 40660, actual: 54700 },
    { name: 'Overhead', budget: 24603, actual: 0 }
  ];

  const pieData = [
    { name: 'Labor', value: 1310277, color: '#8884d8' },
    { name: 'Materials', value: 2603067, color: '#82ca9d' },
    { name: 'Subcontracts', value: 75669, color: '#ffc658' },
    { name: 'Equipment', value: 10496, color: '#ff7300' },
    { name: 'Other', value: 54700, color: '#0088fe' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Modules</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Costs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Job Costs</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Budget to Date</TableHead>
                  <TableHead>Actual Costs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Total:</TableCell>
                  <TableCell>$3,338,300</TableCell>
                  <TableCell className="text-red-600">$4,054,209</TableCell>
                </TableRow>
                {jobCostData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}:</TableCell>
                    <TableCell>${item.budget.toLocaleString()}</TableCell>
                    <TableCell className={item.actual > item.budget ? 'text-red-600' : ''}>
                      ${item.actual.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6 h-48">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobCostData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="budget" fill="#8884d8" />
                    <Bar dataKey="actual" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Contract Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Contract Details</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Contract to Date:</span>
                <span className="font-medium">$3,878,941</span>
              </div>
              <div className="flex justify-between">
                <span>Original Contract Amount:</span>
                <span className="font-medium">$3,643,188</span>
              </div>
              <div className="flex justify-between">
                <span>Approved CORs:</span>
                <span className="font-medium">$235,753</span>
              </div>
              <div className="flex justify-between">
                <span>Actual Costs:</span>
                <span className="font-medium">$4,054,209</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Additional Cost:</span>
                <span className="font-medium">$347,821</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Cost to Complete:</span>
                <span className="font-medium">$4,402,030</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Projected Gross Margin - $:</span>
                <span className="font-medium text-red-600">($523,089)</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Gross Margin - %:</span>
                <span className="font-medium text-red-600">(-13%)</span>
              </div>
            </div>

            <div className="mt-6 h-48">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Change Order Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Change Order Requests</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total(59):</span>
                <span className="font-medium">$246,793</span>
              </div>
              <div className="flex justify-between">
                <span>Approved(55):</span>
                <span className="font-medium">$235,753</span>
              </div>
              <div className="flex justify-between">
                <span>Pending(4): *</span>
                <span className="font-medium">$11,039</span>
              </div>
              <div className="flex justify-between">
                <span>Price/Proceed(0):</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="flex justify-between">
                <span>Price/Don't(4):</span>
                <span className="font-medium">$11,039</span>
              </div>
              <div className="flex justify-between">
                <span>Field WO/T&M(0):</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="flex justify-between">
                <span>Work Under Protest(0):</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-red-600">* Past Due(4):</span>
                <span className="font-medium text-red-600">$11,039</span>
              </div>
              <div className="flex justify-between">
                <span>Potential(0):</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="flex justify-between">
                <span>Approved Labor Hours:</span>
                <span className="font-medium">1.87K</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Report */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Daily Report</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Last DR:</span>
                <span>12/28/2023</span>
              </div>
              <div className="flex justify-between">
                <span>Total DRs:</span>
                <span>484</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total:</span>
                <span className="font-medium">31.29K hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Hours Lost:</span>
                <span className="text-red-600">12 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Base Contract:</span>
                <span>31.29K hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Approved CORs:</span>
                <span>0 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Price/Proceed:</span>
                <span>0 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Field Work Order/T&M:</span>
                <span>0 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Work Under Protest:</span>
                <span>0 hrs</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
              <span>ℹ️</span>
              <span>Total hours are from Daily Reports only</span>
            </div>
          </CardContent>
        </Card>

        {/* RFIs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">RFIs</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-600">Avg Days Late:</span>
                <span className="text-red-600">12 days</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total:</span>
                <span className="font-medium">70</span>
              </div>
              <div className="flex justify-between">
                <span>Answered:</span>
                <span>59</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span>11</span>
              </div>
              <div className="flex justify-between">
                <span>Open:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Past Due:</span>
                <span>11</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submittals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Submittals</CardTitle>
            <div className="flex gap-2">
              <Building className="h-5 w-5 text-orange-500" />
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <PieChartIcon className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-600">Avg Days Late:</span>
                <span className="text-red-600">18 days</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total:</span>
                <span className="font-medium">29</span>
              </div>
              <div className="flex justify-between">
                <span>Approved:</span>
                <span>15</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>Open:</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>Past Due:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>To Be Submitted:</span>
                <span>9</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Milestones</CardTitle>
          <div className="flex gap-2">
            <Building className="h-5 w-5 text-orange-500" />
            <span className="h-5 w-5">🏁</span>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Estimated</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Project Turnover Meeting-EST and PM</TableCell>
                <TableCell>Aug 21, 2020</TableCell>
                <TableCell>Aug 21, 2020</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Made
                  </span>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Start-up Meeting with FM</TableCell>
                <TableCell>Oct 9, 2020</TableCell>
                <TableCell>Oct 9, 2020</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Made
                  </span>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LOI received if applicable</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Substantial Completion</TableCell>
                <TableCell>Sep 14, 2020</TableCell>
                <TableCell>Feb 5, 2021</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-red-600">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Missed
                  </span>
                </TableCell>
                <TableCell>GC delayed issuing</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
