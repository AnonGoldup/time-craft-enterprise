
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Pen } from 'lucide-react';
import jsPDF from 'jspdf';
import { DailyReport } from './types';

interface ReportsTableProps {
  reports: DailyReport[];
  onEditReport: (drNo: number) => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports, onEditReport }) => {
  const handleDownloadPDF = (report: DailyReport) => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text('Daily Report', 20, 30);
    
    // Add report details
    doc.setFontSize(12);
    doc.text(`DR No: ${report.drNo}`, 20, 50);
    doc.text(`Date: ${report.date}`, 20, 60);
    doc.text(`Foreman: ${report.foreman}`, 20, 70);
    doc.text(`Total Workers: ${report.totalWorkers}`, 20, 80);
    doc.text(`Total Hours Lost: ${report.totalHoursLost}`, 20, 90);
    doc.text(`Total Hours: ${report.totalHours}`, 20, 100);
    doc.text(`Submitted By: ${report.submittedBy}`, 20, 110);
    
    // Save the PDF
    doc.save(`DailyReport_${report.drNo}_${report.date.replace(/\//g, '-')}.pdf`);
  };

  return (
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
            {reports.map((report, index) => (
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
                      onClick={() => onEditReport(report.drNo)}
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={() => handleDownloadPDF(report)}
                      title="Download PDF"
                    >
                      <FileText className="h-3 w-3" />
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
  );
};

export default ReportsTable;
