import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, FileText, Users, Clock, Pen } from 'lucide-react';

interface DailyReport {
  drNo: number;
  date: string;
  foreman: string;
  totalWorkers: number;
  totalHoursLost: number;
  totalHours: number;
  submittedBy: string;
}

const mockReports: DailyReport[] = [
  { drNo: 112, date: '6/13/2025', foreman: 'Brad Quinn', totalWorkers: 3, totalHoursLost: 0, totalHours: 13.5, submittedBy: 'Brad Quinn' },
  { drNo: 111, date: '6/12/2025', foreman: 'Brad Quinn', totalWorkers: 3, totalHoursLost: 0, totalHours: 24, submittedBy: 'Brad Quinn' },
  { drNo: 110, date: '6/11/2025', foreman: 'Brad Quinn', totalWorkers: 3, totalHoursLost: 0, totalHours: 24, submittedBy: 'Brad Quinn' },
  { drNo: 109, date: '6/10/2025', foreman: 'Brad Quinn', totalWorkers: 3, totalHoursLost: 0, totalHours: 29.5, submittedBy: 'Brad Quinn' },
  { drNo: 108, date: '6/9/2025', foreman: 'Brad Quinn', totalWorkers: 2, totalHoursLost: 0, totalHours: 18, submittedBy: 'Brad Quinn' },
  { drNo: 107, date: '6/6/2025', foreman: 'Brad Quinn', totalWorkers: 3, totalHoursLost: 0, totalHours: 26, submittedBy: 'Brad Quinn' },
  { drNo: 106, date: '6/5/2025', foreman: 'Brad Quinn', totalWorkers: 2, totalHoursLost: 0, totalHours: 29.25, submittedBy: 'Brad Quinn' },
  { drNo: 105, date: '6/4/2025', foreman: 'Brad Quinn', totalWorkers: 2, totalHoursLost: 0, totalHours: 18, submittedBy: 'Brad Quinn' },
  { drNo: 104, date: '6/3/2025', foreman: 'Brad Quinn', totalWorkers: 2, totalHoursLost: 0, totalHours: 18, submittedBy: 'Brad Quinn' },
  { drNo: 103, date: '6/2/2025', foreman: 'Brad Quinn', totalWorkers: 2, totalHoursLost: 0, totalHours: 29, submittedBy: 'Brad Quinn' },
];

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DR Log</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Daily Report Management</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New DR
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReports.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...mockReports.map(r => r.totalWorkers))}
            </div>
            <p className="text-xs text-muted-foreground">
              Peak workers today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReports.reduce((sum, r) => sum + r.totalHours, 0).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              This period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg">
        <div className="flex space-x-6">
          <span className="font-medium cursor-pointer">DR Log</span>
          <span className="cursor-pointer opacity-75 hover:opacity-100">Labor Unit Productivity</span>
          <span className="cursor-pointer opacity-75 hover:opacity-100">Equipment Usage Summary</span>
          <span className="cursor-pointer opacity-75 hover:opacity-100">Hours Lost Summary</span>
        </div>
      </div>

      {/* Search and Filters */}
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

      {/* Daily Report Log Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Daily Report Log</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                Print
              </Button>
              <Button variant="outline" size="sm">
                Print Multiple
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-700 hover:bg-blue-700">
                <TableHead className="text-white font-bold">ACTION</TableHead>
                <TableHead className="text-white font-bold">DR No</TableHead>
                <TableHead className="text-white font-bold">Date</TableHead>
                <TableHead className="text-white font-bold">Foreman</TableHead>
                <TableHead className="text-white font-bold">Total Workers</TableHead>
                <TableHead className="text-white font-bold">Total Hours Lost</TableHead>
                <TableHead className="text-white font-bold">Total Hours</TableHead>
                <TableHead className="text-white font-bold">Submitted By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report, index) => (
                <TableRow 
                  key={report.drNo} 
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-900"}
                >
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => handleEditReport(report.drNo)}
                        title="Edit Daily Report"
                      >
                        <Pen className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                        <FileText className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                        📊
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                        📝
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                        🖨️
                      </Button>
                      <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                        📋
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{report.drNo}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.foreman}</TableCell>
                  <TableCell className="text-center">{report.totalWorkers}</TableCell>
                  <TableCell className="text-center">{report.totalHoursLost}</TableCell>
                  <TableCell className="text-center">{report.totalHours}</TableCell>
                  <TableCell>{report.submittedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReporting;
