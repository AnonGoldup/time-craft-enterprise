
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CommentFields } from './types';

interface CommentsSectionProps {
  commentFields: CommentFields;
  updateCommentField: (field: keyof CommentFields, value: string | boolean) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  commentFields,
  updateCommentField,
  isOpen,
  setIsOpen
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 py-3">
            <div className="flex items-center justify-between">
              <CardTitle>Comments</CardTitle>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Description Of Work Performed */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Description Of Work Performed</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="descriptionOfWorkInternal"
                    checked={commentFields.descriptionOfWorkInternal}
                    onCheckedChange={(checked) => updateCommentField('descriptionOfWorkInternal', checked as boolean)}
                  />
                  <label htmlFor="descriptionOfWorkInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter description of work performed..."
                value={commentFields.descriptionOfWork}
                onChange={(e) => updateCommentField('descriptionOfWork', e.target.value)}
                rows={2}
              />
            </div>

            {/* Job Site Conditions */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Job Site Conditions</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jobSiteConditionsInternal"
                    checked={commentFields.jobSiteConditionsInternal}
                    onCheckedChange={(checked) => updateCommentField('jobSiteConditionsInternal', checked as boolean)}
                  />
                  <label htmlFor="jobSiteConditionsInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter job site conditions..."
                value={commentFields.jobSiteConditions}
                onChange={(e) => updateCommentField('jobSiteConditions', e.target.value)}
                rows={2}
              />
            </div>

            {/* Extra Work/Favors */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Extra Work/Favors</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="extraWorkFavorsInternal"
                    checked={commentFields.extraWorkFavorsInternal}
                    onCheckedChange={(checked) => updateCommentField('extraWorkFavorsInternal', checked as boolean)}
                  />
                  <label htmlFor="extraWorkFavorsInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter extra work/favors..."
                value={commentFields.extraWorkFavors}
                onChange={(e) => updateCommentField('extraWorkFavors', e.target.value)}
                rows={2}
              />
            </div>

            {/* Accident Report */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Accident Report</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accidentReportInternal"
                    checked={commentFields.accidentReportInternal}
                    onCheckedChange={(checked) => updateCommentField('accidentReportInternal', checked as boolean)}
                  />
                  <label htmlFor="accidentReportInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter accident report..."
                value={commentFields.accidentReport}
                onChange={(e) => updateCommentField('accidentReport', e.target.value)}
                rows={2}
              />
            </div>

            {/* Near Misses/Hazard ID's */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Near Misses/Hazard ID's</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nearMissesHazardIdsInternal"
                    checked={commentFields.nearMissesHazardIdsInternal}
                    onCheckedChange={(checked) => updateCommentField('nearMissesHazardIdsInternal', checked as boolean)}
                  />
                  <label htmlFor="nearMissesHazardIdsInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter near misses/hazard ID's..."
                value={commentFields.nearMissesHazardIds}
                onChange={(e) => updateCommentField('nearMissesHazardIds', e.target.value)}
                rows={2}
              />
            </div>

            {/* Job Site Cleanliness */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Job Site Cleanliness</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jobSiteCleanlinessInternal"
                    checked={commentFields.jobSiteCleanlinessInternal}
                    onCheckedChange={(checked) => updateCommentField('jobSiteCleanlinessInternal', checked as boolean)}
                  />
                  <label htmlFor="jobSiteCleanlinessInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter job site cleanliness notes..."
                value={commentFields.jobSiteCleanliness}
                onChange={(e) => updateCommentField('jobSiteCleanliness', e.target.value)}
                rows={2}
              />
            </div>

            {/* Comments/Problems */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Comments/Problems</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="commentsProblemsInternal"
                    checked={commentFields.commentsProblemsInternal}
                    onCheckedChange={(checked) => updateCommentField('commentsProblemsInternal', checked as boolean)}
                  />
                  <label htmlFor="commentsProblemsInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enter comments/problems..."
                value={commentFields.commentsProblems}
                onChange={(e) => updateCommentField('commentsProblems', e.target.value)}
                rows={2}
              />
            </div>

            {/* Internal Comments */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Internal Comments</label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="internalCommentsInternal"
                    checked={commentFields.internalCommentsInternal}
                    onCheckedChange={(checked) => updateCommentField('internalCommentsInternal', checked as boolean)}
                  />
                  <label htmlFor="internalCommentsInternal" className="text-sm">Internal</label>
                </div>
              </div>
              <Textarea
                placeholder="Enable and browse setting for spell check..."
                value={commentFields.internalComments}
                onChange={(e) => updateCommentField('internalComments', e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CommentsSection;
