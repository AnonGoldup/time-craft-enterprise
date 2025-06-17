
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface IssuesSectionProps {
  issues: string;
  setIssues: (issues: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const IssuesSection: React.FC<IssuesSectionProps> = ({
  issues,
  setIssues,
  isOpen,
  setIsOpen
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle>Issues</CardTitle>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <Textarea
              placeholder="No issues on Project"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              rows={3}
            />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default IssuesSection;
