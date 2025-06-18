
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SummaryCards from '@/components/DailyReporting/SummaryCards';
import NavigationTabs from '@/components/DailyReporting/NavigationTabs';
import SearchFilters from '@/components/DailyReporting/SearchFilters';
import ReportsTable from '@/components/DailyReporting/ReportsTable';
import { mockReports } from '@/components/DailyReporting/mockData';

const DailyReporting: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrNo, setSelectedDrNo] = useState('');
  const [notesComments, setNotesComments] = useState('');
  const [hoursLostOn, setHoursLostOn] = useState(false);

  const filteredReports = mockReports.filter(report => 
    report.drNo.toString().includes(searchTerm) ||
    report.foreman.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.date.includes(searchTerm)
  );

  const handleEditReport = (drNo: number) => {
    navigate(`/daily-reporting/edit/${drNo}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">DR Log</h1>
          <p className="text-lg text-muted-foreground">Daily Report Management</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-4">
          <Plus className="h-4 w-4 mr-2" />
          Create New DR
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="space-y-6">
        <SummaryCards reports={mockReports} />
      </div>

      {/* Navigation and Content */}
      <div className="space-y-0">
        <NavigationTabs />
        
        <div className="bg-card border border-border rounded-b-lg p-6 space-y-6">
          {/* Search and Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDrNo={selectedDrNo}
            setSelectedDrNo={setSelectedDrNo}
            notesComments={notesComments}
            setNotesComments={setNotesComments}
            hoursLostOn={hoursLostOn}
            setHoursLostOn={setHoursLostOn}
          />

          {/* Daily Report Log Table */}
          <ReportsTable
            reports={filteredReports}
            onEditReport={handleEditReport}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyReporting;
