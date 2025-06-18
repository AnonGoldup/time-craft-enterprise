
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  selectedEmployee: string;
  setSelectedEmployee: (employee: string) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  selectedWeek,
  setSelectedWeek,
  selectedEmployee,
  setSelectedEmployee
}) => {
  return (
    <Card className="bg-card border-border mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="pending">Pending</option>
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Week Jun 03 - Jun 09">Week Jun 03 - Jun 09</option>
              <option value="Week May 27 - Jun 02">Week May 27 - Jun 02</option>
              <option value="Week May 20 - May 26">Week May 20 - May 26</option>
            </select>

            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="All Employees">All Employees</option>
              <option value="JS001">John Smith (JS001)</option>
              <option value="SJ002">Sarah Johnson (SJ002)</option>
              <option value="MD003">Mike Davis (MD003)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              Bulk Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
