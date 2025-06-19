
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface EntryCardHeaderProps {
  entryNumber: number;
  canDelete: boolean;
  onDelete: () => void;
}

const EntryCardHeader: React.FC<EntryCardHeaderProps> = ({
  entryNumber,
  canDelete,
  onDelete
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">
            {entryNumber}
          </span>
        </div>
        <h3 className="font-semibold text-foreground">
          Entry {entryNumber}
        </h3>
      </div>
      
      {canDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default EntryCardHeader;
