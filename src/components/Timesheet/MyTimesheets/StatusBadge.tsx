
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from './utils';

interface StatusBadgeProps {
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const variants = {
    Draft: {
      variant: 'outline' as const,
      className: 'border-gray-300 text-gray-700'
    },
    Submitted: {
      variant: 'secondary' as const,
      className: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    Approved: {
      variant: 'default' as const,
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    Rejected: {
      variant: 'destructive' as const,
      className: 'bg-red-100 text-red-700 border-red-200'
    }
  };

  const config = variants[status] || variants.Draft;

  return (
    <Badge variant={config.variant} className={cn('text-xs', config.className)}>
      {status}
    </Badge>
  );
};
