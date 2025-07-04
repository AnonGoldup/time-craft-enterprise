
import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Download, Timer, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { CustomExportDialog } from './CustomExportDialog';
import { useCustomExports, type CustomExportFormat } from '@/hooks/useCustomExports';

interface WeeklyStats {
  readonly totalEmployees: number;
  readonly submitted: number;
  readonly pending: number;
  readonly notSubmitted: number;
  readonly regularHours: number;
  readonly overtimeHours: number;
  readonly totalEntries: number;
  readonly estimatedPayroll: number;
}

const EXPORT_FORMATS = {
  SAGE300: 'sage300',
  SAGE300_CUSTOM: 'sage300custom',
  EXCEL: 'excel'
} as const;

type ExportFormat = typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS] | string;

interface ExportConfigurationProps {
  selectedWeek: string;
  exportFormat: ExportFormat;
  isExporting: boolean;
  exportProgress: number;
  weeklyStats: WeeklyStats;
  onWeekChange: (week: string) => void;
  onFormatChange: (format: ExportFormat) => void;
  onExport: () => void;
}

const FormatPreview = memo(({ format }: { format: ExportFormat }) => {
  const previews = {
    [EXPORT_FORMATS.SAGE300]: (
      <div className="space-y-1">
        <div className="text-green-700 font-medium">SAGE 300 Standard CSV:</div>
        <div className="bg-gray-100 p-2 rounded text-xs font-mono">
          "EMP001","21-0066","","001-040-043",1,1,8.00,,,06212025
        </div>
        <div className="text-gray-500 text-xs">
          Format: "EmployeeID","ProjectCode","Extra","CostCode",UnionID,PayID,Hours,,,MMDDYYYY
        </div>
      </div>
    ),
    [EXPORT_FORMATS.SAGE300_CUSTOM]: (
      <div className="space-y-1">
        <div className="text-blue-700 font-medium">SAGE 300 Custom CSV:</div>
        <div className="bg-gray-100 p-2 rounded text-xs font-mono">
          "EMP001","21-0066","","001-040-043",1,1,8.00,"Edmonton EXPO","Direct Labor",06212025
        </div>
        <div className="text-gray-500 text-xs">
          Format: Includes project name and cost code description
        </div>
      </div>
    ),
    [EXPORT_FORMATS.EXCEL]: (
      <div className="space-y-1">
        <div className="text-purple-700 font-medium">Excel Detailed Format:</div>
        <div className="bg-gray-100 p-2 rounded text-xs">
          Full spreadsheet with headers and human-readable format
        </div>
        <div className="text-gray-500 text-xs">
          Employee ID | Name | Date | Project | Hours | Type
        </div>
      </div>
    )
  };

  return previews[format] || null;
});

FormatPreview.displayName = 'FormatPreview';

export const ExportConfiguration: React.FC<ExportConfigurationProps> = ({
  selectedWeek,
  exportFormat,
  isExporting,
  exportProgress,
  weeklyStats,
  onWeekChange,
  onFormatChange,
  onExport
}) => {
  const { customFormats, addCustomFormat, updateCustomFormat, deleteCustomFormat } = useCustomExports();
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [editingFormat, setEditingFormat] = useState<CustomExportFormat | undefined>();

  const handleCreateCustom = () => {
    setEditingFormat(undefined);
    setCustomDialogOpen(true);
  };

  const handleEditCustom = (format: CustomExportFormat) => {
    setEditingFormat(format);
    setCustomDialogOpen(true);
  };

  const handleSaveCustom = (format: Omit<CustomExportFormat, 'id' | 'createdAt'>) => {
    if (editingFormat) {
      updateCustomFormat(editingFormat.id, format);
    } else {
      const newFormat = addCustomFormat(format);
      onFormatChange(newFormat.id);
    }
  };

  const handleDeleteCustom = (formatId: string) => {
    deleteCustomFormat(formatId);
    if (exportFormat === formatId) {
      onFormatChange(EXPORT_FORMATS.SAGE300);
    }
  };

  const isCustomFormat = (format: string): boolean => {
    return customFormats.some(f => f.id === format);
  };

  const getCustomFormat = (formatId: string): CustomExportFormat | undefined => {
    return customFormats.find(f => f.id === formatId);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Export Configuration</CardTitle>
            <CardDescription>Configure and execute payroll exports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="week-select" className="text-sm font-medium block mb-2">
                  Week Ending Date
                </label>
                <Select value={selectedWeek} onValueChange={onWeekChange}>
                  <SelectTrigger id="week-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-06-21">June 21, 2025</SelectItem>
                    <SelectItem value="2025-06-14">June 14, 2025</SelectItem>
                    <SelectItem value="2025-06-07">June 7, 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="format-select" className="text-sm font-medium">
                    Export Format
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCreateCustom}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Custom
                  </Button>
                </div>
                <Select value={exportFormat} onValueChange={onFormatChange}>
                  <SelectTrigger id="format-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EXPORT_FORMATS.SAGE300}>
                      <div className="flex flex-col">
                        <span className="font-medium">SAGE 300 CSV Format</span>
                        <span className="text-xs text-gray-500">Standard payroll import format</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={EXPORT_FORMATS.SAGE300_CUSTOM}>
                      <div className="flex flex-col">
                        <span className="font-medium">SAGE 300 CSV (Custom)</span>
                        <span className="text-xs text-gray-500">With additional project fields</span>
                      </div>
                    </SelectItem>
                    <SelectItem value={EXPORT_FORMATS.EXCEL}>
                      <div className="flex flex-col">
                        <span className="font-medium">Excel Detailed Format</span>
                        <span className="text-xs text-gray-500">Human-readable with all columns</span>
                      </div>
                    </SelectItem>
                    
                    {customFormats.length > 0 && (
                      <>
                        <div className="px-2 py-1.5">
                          <div className="text-xs font-medium text-muted-foreground">Custom Formats</div>
                        </div>
                        {customFormats.map((format) => (
                          <SelectItem key={format.id} value={format.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col">
                                <span className="font-medium">{format.name}</span>
                                <span className="text-xs text-gray-500">{format.description}</span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="sm" className="h-auto p-1">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEditCustom(format)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteCustom(format.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                <div className="mt-3 p-3 bg-gray-50 rounded border">
                  <div className="text-xs font-medium text-gray-700 mb-2">Format Preview:</div>
                  {isCustomFormat(exportFormat) ? (
                    <div className="space-y-1">
                      <div className="text-blue-700 font-medium">Custom Format: {getCustomFormat(exportFormat)?.name}</div>
                      <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                        {getCustomFormat(exportFormat)?.headers.join(',')}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {getCustomFormat(exportFormat)?.description}
                      </div>
                    </div>
                  ) : (
                    <FormatPreview format={exportFormat as typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS]} />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1" disabled={isExporting}>
                <Eye className="w-4 h-4 mr-2" />
                Preview Export
              </Button>
              <Button 
                onClick={onExport} 
                disabled={isExporting}
                className="flex-1"
              >
                {isExporting ? (
                  <>
                    <Timer className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export to SAGE
                  </>
                )}
              </Button>
            </div>
            
            {isExporting && (
              <div className="space-y-2" role="progressbar" aria-valuenow={exportProgress} aria-valuemin={0} aria-valuemax={100}>
                <div className="flex justify-between text-sm">
                  <span>Processing entries...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} />
              </div>
            )}
          </CardContent>
        </Card>
        
        <CustomExportDialog
          open={customDialogOpen}
          onOpenChange={setCustomDialogOpen}
          onSave={handleSaveCustom}
          editingFormat={editingFormat}
        />
      </div>
      
      {/* Export Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Entries:</span>
            <span className="font-medium">{weeklyStats.totalEntries.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Regular Hours:</span>
            <span className="font-medium">{weeklyStats.regularHours.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Overtime Hours:</span>
            <span className="font-medium">{weeklyStats.overtimeHours.toLocaleString()}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Estimated Amount:</span>
              <span className="text-green-600">${weeklyStats.estimatedPayroll.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { EXPORT_FORMATS, type ExportFormat };
