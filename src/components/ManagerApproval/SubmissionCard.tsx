import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Clock, CheckCircle2, XCircle, Timer, Target, Calendar, Flag, AlertTriangle, 
  MessageSquare, ChevronDown, ChevronUp, Building, Zap, Hash 
} from 'lucide-react';
import { TimesheetSubmission } from './types';
import { cn, getStatusColor, getEfficiencyColor } from './utils';

interface SubmissionCardProps {
  submission: TimesheetSubmission;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  onApprove,
  onReject,
  isSelected,
  onSelect
}) => {
  const [expanded, setExpanded] = useState(false);
  const isPending = submission.status === 'Pending';

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg",
      isPending ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200',
      isSelected && 'ring-2 ring-blue-500 border-blue-300'
    )}>
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-center space-x-3 mb-2">
            {isPending && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            )}
            <h3 className="text-base font-semibold text-gray-900">
              {submission.employeeName}
            </h3>
            <Badge className={getStatusColor(submission.status)}>
              {submission.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
              {submission.status === 'Approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {submission.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
              {submission.status}
            </Badge>
          </div>
          
          {/* Enhanced Employee Info */}
          <div className="bg-gray-50 p-3 rounded-lg mb-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-700">Employee:</span>
                <span className="text-xs text-gray-900">{submission.employeeId} • {submission.class}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Building className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Project:</span>
                <span className="text-xs text-gray-900">{submission.projectCode}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium text-gray-700">Extra:</span>
                <span className="text-xs text-gray-900">{submission.extraValue}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-gray-700">Cost Code:</span>
                <span className="text-xs text-gray-900">{submission.costCode}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Timer className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-900">Total Hours</span>
              </div>
              <p className="text-base font-bold text-blue-600">{submission.totalHours}h</p>
              {submission.overtimeHours > 0 && (
                <p className="text-xs text-blue-700">+{submission.overtimeHours}h OT</p>
              )}
            </div>
            
            <div className="bg-green-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Target className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-green-900">Efficiency</span>
              </div>
              <p className={`text-base font-bold ${getEfficiencyColor(submission.efficiency)}`}>
                {submission.efficiency}%
              </p>
            </div>
            
            <div className="bg-purple-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-900">Week Ending</span>
              </div>
              <p className="text-xs font-bold text-purple-600">{submission.weekEnding}</p>
            </div>
            
            <div className="bg-orange-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Flag className="w-3 h-3 text-orange-600" />
                <span className="text-xs font-medium text-orange-900">Issues</span>
              </div>
              <p className="text-base font-bold text-orange-600">{submission.anomalies.length}</p>
            </div>
          </div>
        </div>

        {submission.anomalies.length > 0 && (
          <Alert className="mb-3 border-amber-200 bg-amber-50">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <AlertDescription>
              <div className="font-semibold text-amber-900 mb-1">Attention Required</div>
              <ul className="text-amber-800 text-xs">
                {submission.anomalies.map((anomaly, index) => (
                  <li key={index}>• {anomaly}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {submission.notes && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-2 text-xs mb-1">
              <MessageSquare className="w-3 h-3 text-blue-600" />
              <span className="font-medium text-blue-800">Notes:</span>
            </div>
            <p className="text-xs text-blue-700 ml-5">{submission.notes}</p>
          </div>
        )}

        {/* Action Buttons Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <span>Submitted: {new Date(submission.submitDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isPending && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject(submission.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => onApprove(submission.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </>
            )}
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setExpanded(!expanded)}
              className="text-gray-500"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  More
                </>
              )}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Productivity Score:</span>
                    <span className={`font-medium ${getEfficiencyColor(submission.efficiency)}`}>
                      {submission.efficiency}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekly Hours:</span>
                    <span className="font-medium">{submission.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Overtime Ratio:</span>
                    <span className="font-medium">
                      {(submission.overtimeHours / submission.totalHours * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Submit Date:</span>
                    <span className="font-medium">
                      {new Date(submission.submitDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Time Entry Details</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {submission.projectCode} - {submission.extraValue}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      Cost Code: {submission.costCode}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Regular: {submission.totalHours - submission.overtimeHours}h</span>
                      <span>OT: {submission.overtimeHours}h</span>
                    </div>
                  </div>
                  {submission.projects && submission.projects.length > 1 && (
                    <div className="text-xs text-gray-500">
                      * Multiple projects: {submission.projects.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
