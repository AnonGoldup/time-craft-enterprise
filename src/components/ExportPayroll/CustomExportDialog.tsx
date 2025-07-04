import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Eye } from 'lucide-react';
import { AVAILABLE_HEADERS, type CustomExportFormat } from '@/hooks/useCustomExports';

interface CustomExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (format: Omit<CustomExportFormat, 'id' | 'createdAt'>) => void;
  editingFormat?: CustomExportFormat;
}

export const CustomExportDialog: React.FC<CustomExportDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  editingFormat
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Initialize form when editing
  useEffect(() => {
    if (editingFormat) {
      setName(editingFormat.name);
      setDescription(editingFormat.description);
      setSelectedHeaders(editingFormat.headers);
    } else {
      // Set required headers by default
      const requiredHeaders = AVAILABLE_HEADERS.filter(h => h.required).map(h => h.id);
      setSelectedHeaders(requiredHeaders);
    }
  }, [editingFormat]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setName('');
      setDescription('');
      setSelectedHeaders(AVAILABLE_HEADERS.filter(h => h.required).map(h => h.id));
      setShowPreview(false);
    }
  }, [open]);

  const handleHeaderToggle = (headerId: string, checked: boolean) => {
    const header = AVAILABLE_HEADERS.find(h => h.id === headerId);
    if (header?.required && !checked) return; // Don't allow unchecking required headers
    
    if (checked) {
      setSelectedHeaders(prev => [...prev, headerId]);
    } else {
      setSelectedHeaders(prev => prev.filter(id => id !== headerId));
    }
  };

  const handleSave = () => {
    if (!name.trim() || selectedHeaders.length === 0) return;
    
    onSave({
      name: name.trim(),
      description: description.trim(),
      headers: selectedHeaders
    });
    onOpenChange(false);
  };

  const generatePreview = () => {
    const headerLabels = selectedHeaders.map(id => 
      AVAILABLE_HEADERS.find(h => h.id === id)?.label || id
    );
    return headerLabels.join(',');
  };

  const isValid = name.trim() && selectedHeaders.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {editingFormat ? 'Edit Custom Export' : 'Create Custom Export'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="export-name">Export Name *</Label>
              <Input
                id="export-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Daily Report Export"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="export-description">Description</Label>
              <Textarea
                id="export-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this export format..."
                className="mt-1"
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* Header Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-medium">Select Headers</Label>
              <Badge variant="secondary">
                {selectedHeaders.length} selected
              </Badge>
            </div>
            
            <ScrollArea className="h-64 border rounded-lg p-4">
              <div className="space-y-3">
                {AVAILABLE_HEADERS.map((header) => {
                  const isSelected = selectedHeaders.includes(header.id);
                  const isRequired = header.required;
                  
                  return (
                    <div key={header.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={header.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => 
                          handleHeaderToggle(header.id, !!checked)
                        }
                        disabled={isRequired && isSelected}
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={header.id}
                          className={`cursor-pointer ${isRequired ? 'font-medium' : ''}`}
                        >
                          {header.label}
                          {isRequired && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Required
                            </Badge>
                          )}
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Preview */}
          <div>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            {showPreview && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-2">CSV Header Preview:</div>
                <code className="text-xs bg-background p-2 rounded block overflow-x-auto">
                  {generatePreview()}
                </code>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isValid} className="gap-2">
              <Save className="h-4 w-4" />
              {editingFormat ? 'Update Export' : 'Save Export'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};