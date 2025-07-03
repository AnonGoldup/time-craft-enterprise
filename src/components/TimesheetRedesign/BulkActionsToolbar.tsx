import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Copy, 
  Trash2, 
  Edit3, 
  Merge, 
  Move,
  Download,
  Send
} from 'lucide-react';

interface BulkActionsToolbarProps {
  selectedCount: number;
  onClear: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMerge: () => void;
}

export const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
  selectedCount,
  onClear,
  onDuplicate,
  onDelete,
  onMerge,
}) => {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5 animate-scale-in">
      <CardContent className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="gap-1">
              {selectedCount} selected
            </Badge>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="gap-2 text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onDuplicate}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Duplicate
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onMerge}
              className="gap-2"
              disabled={selectedCount < 2}
            >
              <Merge className="h-4 w-4" />
              Merge
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Move className="h-4 w-4" />
              Move
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Batch Edit
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Submit
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};