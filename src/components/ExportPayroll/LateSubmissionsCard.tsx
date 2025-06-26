
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Send } from 'lucide-react';

interface LateSubmission {
  readonly id: string;
  readonly name: string;
  readonly daysLate: number;
}

interface LateSubmissionsCardProps {
  lateSubmissions: readonly LateSubmission[];
}

export const LateSubmissionsCard: React.FC<LateSubmissionsCardProps> = ({
  lateSubmissions
}) => {
  if (lateSubmissions.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-200">
      <CardHeader>
        <CardTitle className="text-lg text-orange-600 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Late Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {lateSubmissions.map(emp => (
              <div key={emp.id} className="p-2 bg-orange-50 rounded border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{emp.name}</span>
                  <Badge variant="outline" className="text-orange-600">
                    {emp.daysLate} days late
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="w-full mt-3" size="sm">
          <Send className="w-3 h-3 mr-2" />
          Send Reminders
        </Button>
      </CardContent>
    </Card>
  );
};
