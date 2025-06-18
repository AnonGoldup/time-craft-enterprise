
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">DR Log</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Daily Report Management</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4">
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
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg p-6 space-y-6">
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
