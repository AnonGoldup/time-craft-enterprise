
import React from 'react';
import { formatCurrency } from './utils';
import { dashboardData } from './dashboardData';

interface WeeklyChartProps {
  data: any;
  type: string;
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data, type }) => {
  const maxValue = Math.max(...data.map((d: any) => 
    type === 'hours' ? d.standard + d.overtime : 
    type === 'efficiency' ? d : d
  ));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {type === 'hours' ? 'Daily Hours' : 
           type === 'efficiency' ? 'Efficiency Trend' : 'Daily Costs'}
        </h4>
        {type === 'hours' && (
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Overtime</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-end space-x-2 h-32">
        {(type === 'hours' ? dashboardData.weeklyTrends.hoursData : 
          type === 'efficiency' ? dashboardData.weeklyTrends.efficiencyTrend.map((val, i) => ({
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            value: val
          })) : 
          dashboardData.weeklyTrends.costTrend.map((val, i) => ({
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
            value: val
          }))
        ).map((item: any, index: number) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-1">
            <div 
              className="w-full flex flex-col items-center justify-end" 
              style={{ height: '100px' }}
            >
              {type === 'hours' ? (
                <>
                  <div 
                    className="w-full bg-orange-500 rounded-t" 
                    style={{ height: `${item.overtime / maxValue * 80}px` }}
                    title={`Overtime: ${item.overtime}h`}
                  ></div>
                  <div 
                    className="w-full bg-blue-500 rounded-b" 
                    style={{ height: `${item.standard / maxValue * 80}px` }}
                    title={`Standard: ${item.standard}h`}
                  ></div>
                </>
              ) : (
                <div 
                  className={`w-full rounded ${type === 'efficiency' ? 'bg-green-500' : 'bg-purple-500'}`}
                  style={{ height: `${item.value / maxValue * 80}px` }}
                  title={`${type === 'efficiency' ? item.value + '%' : formatCurrency(item.value)}`}
                ></div>
              )}
            </div>
            <span className="text-xs text-gray-600">{item.day || item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
