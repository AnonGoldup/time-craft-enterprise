
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ProjectData {
  readonly code: string;
  readonly name: string;
  readonly employees: number;
  readonly approved: number;
  readonly pending: number;
  readonly rejected: number;
  readonly hours: number;
}

interface ProjectGridProps {
  projectData: readonly ProjectData[];
  onProjectSelect: (project: ProjectData) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projectData,
  onProjectSelect
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {projectData.map(project => {
        const isFullyApproved = project.pending === 0 && project.rejected === 0;
        const approvalRate = project.approved / project.employees * 100;
        
        return (
          <Card 
            key={project.code} 
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              isFullyApproved 
                ? 'border-green-500 bg-green-50' 
                : project.rejected > 0 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-orange-500 bg-orange-50'
            }`} 
            onClick={() => onProjectSelect(project)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-sm">{project.code}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2" title={project.name}>
                    {project.name}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{approvalRate.toFixed(0)}%</span>
                    {isFullyApproved ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : project.rejected > 0 ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  
                  <Progress 
                    value={approvalRate} 
                    className={`h-2 ${
                      isFullyApproved 
                        ? 'bg-green-200' 
                        : project.rejected > 0 
                          ? 'bg-red-200' 
                          : 'bg-orange-200'
                    }`} 
                  />
                  
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-green-600">{project.approved}</div>
                      <div className="text-gray-500">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-orange-600">{project.pending}</div>
                      <div className="text-gray-500">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-red-600">{project.rejected}</div>
                      <div className="text-gray-500">Rejected</div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-1 border-t">
                    <div className="text-xs text-gray-500">Total Hours</div>
                    <div className="font-bold text-blue-600">{project.hours.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
