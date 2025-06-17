
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

export const LogsSection: React.FC = () => {
  return (
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
  );
};
