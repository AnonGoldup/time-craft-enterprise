
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDrNo: string;
  setSelectedDrNo: (drNo: string) => void;
  notesComments: string;
  setNotesComments: (notes: string) => void;
  hoursLostOn: boolean;
  setHoursLostOn: (hoursLost: boolean) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDrNo,
  setSelectedDrNo,
  notesComments,
  setNotesComments,
  hoursLostOn,
  setHoursLostOn
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">SEARCH</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm">DR No:</label>
            <Input
              placeholder="DR Number"
              value={selectedDrNo}
              onChange={(e) => setSelectedDrNo(e.target.value)}
              className="w-32"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm">Notes/Comments:</label>
            <Input
              placeholder="Search notes..."
              value={notesComments}
              onChange={(e) => setNotesComments(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm">Hours Lost On:</label>
            <input
              type="checkbox"
              checked={hoursLostOn}
              onChange={(e) => setHoursLostOn(e.target.checked)}
              className="h-4 w-4"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by DR number, foreman, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
