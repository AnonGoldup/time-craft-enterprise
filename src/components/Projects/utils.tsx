
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'OPEN':
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">OPEN</Badge>;
    case 'COMPLETE':
      return <Badge className="bg-green-500/20 text-green-400 border-green-400">COMPLETE</Badge>;
    case 'BID':
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400">BID</Badge>;
    case 'BID_WIN':
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400">BID WIN</Badge>;
    case 'BID_LOST':
      return <Badge className="bg-red-500/20 text-red-400 border-red-400">BID LOST</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getHoursBadge = (actual: number, estimated: number) => {
  if (actual > estimated && estimated > 0) {
    return <Badge variant="destructive">{actual} hrs</Badge>;
  }
  return <Badge className="bg-green-500/20 text-green-400">{actual} hrs</Badge>;
};
