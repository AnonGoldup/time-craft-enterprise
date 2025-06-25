
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Timer, FileText } from 'lucide-react';
import { Statistics } from './types';

interface StatisticsCardsProps {
  statistics: Statistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <Card className="border-2">
        <CardContent className="p-4 h-[80px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalHours.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardContent className="p-4 h-[80px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">Standard</p>
              <p className="text-2xl font-bold text-blue-600">{statistics.standardHours.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Timer className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-orange-200 bg-orange-50/30">
        <CardContent className="p-4 h-[80px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">Overtime</p>
              <p className="text-2xl font-bold text-orange-600">{statistics.overtimeHours.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Timer className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-green-200 bg-green-50/30">
        <CardContent className="p-4 h-[80px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center">
              <p className="text-xs text-muted-foreground mb-1">Entries</p>
              <p className="text-2xl font-bold text-green-600">{statistics.entries}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
