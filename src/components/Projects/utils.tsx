
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  return status === 'OPEN' ? (
    <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">OPEN</Badge>
  ) : (
    <Badge className="bg-green-500/20 text-green-400 border-green-400">COMPLETE</Badge>
  );
};

export const getHoursBadge = (actual: number, estimated: number) => {
  if (actual > estimated && estimated > 0) {
    return <Badge variant="destructive">{actual} hrs</Badge>;
  }
  return <Badge className="bg-green-500/20 text-green-400">{actual} hrs</Badge>;
};
