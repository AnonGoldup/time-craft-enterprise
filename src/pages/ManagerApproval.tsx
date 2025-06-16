import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Search,
  Download,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface TimesheetEntry {
  id: string;
  employeeName: string;
  employeeId: string;
  project: string;
  projectCode: string;
  date: string;
  standardHours: number;
  overtimeHours: number;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  submittedDate: string;
  submittedBy: string;
}

const ManagerApproval = () => {
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedWeek, setSelectedWeek] = useState("Week Jun 03 - Jun 09");
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees");

  const mockEntries: TimesheetEntry[] = [
    {
      id: "1",
      employeeName: "Sarah Johnson",
      employeeId: "SJ002",
      project: "Mobile App Development",
      projectCode: "MOB-2025-01",
      date: "2024-06-03",
      standardHours: 8.0,
      overtimeHours: 2.0,
      status: "pending",
      notes: "Worked extra hours to complete critical feature implementation for the upcoming release deadline.",
      submittedDate: "Jun 03, 2025 6:45 PM",
      submittedBy: "sarah.johnson@company.com"
    },
    {
      id: "2",
      employeeName: "John Smith",
      employeeId: "JS001",
      project: "Cloud Migration Project",
      projectCode: "CLD-2025-02",
      date: "2024-06-04",
      standardHours: 7.5,
      overtimeHours: 0.0,
      status: "pending",
      notes: "Standard development work on migration scripts.",
      submittedDate: "Jun 04, 2025 5:30 PM",
      submittedBy: "john.smith@company.com"
    },
    {
      id: "3",
      employeeName: "Mike Davis",
      employeeId: "MD003",
      project: "Data Analytics Platform",
      projectCode: "DAP-2025-03",
      date: "2024-06-05",
      standardHours: 8.0,
      overtimeHours: 3.0,
      status: "pending",
      notes: "Extended hours for data processing optimization.",
      submittedDate: "Jun 05, 2025 7:15 PM",
      submittedBy: "mike.davis@company.com"
    },
    {
      id: "4",
      employeeName: "Emily Chen",
      employeeId: "EC004",
      project: "Security Audit",
      projectCode: "SEC-2025-04",
      date: "2024-06-06",
      standardHours: 6.0,
      overtimeHours: 0.0,
      status: "approved",
      notes: "Security assessment and documentation.",
      submittedDate: "Jun 06, 2025 4:00 PM",
      submittedBy: "emily.chen@company.com"
    }
  ];

  const pendingEntries = mockEntries.filter(entry => entry.status === 'pending');
  const overdueCount = 8; // Mock overdue count
  const approvalRate = 95;
  const approvedToday = 12;

  const handleApprove = (entryId: string) => {
    toast.success("Timesheet entry approved successfully!");
    console.log("Approved entry:", entryId);
  };

  const handleReject = (entryId: string, reason: string) => {
    toast.error("Timesheet entry rejected");
    console.log("Rejected entry:", entryId, "Reason:", reason);
    setRejectReason("");
  };

  const handleRequestChanges = (entryId: string) => {
    toast.info("Change request sent to employee");
    console.log("Requested changes for entry:", entryId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-400";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Manager Approval Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Review and approve team timesheet entries</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">PENDING APPROVAL</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pendingEntries.length}</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                  {pendingEntries.reduce((sum, entry) => sum + entry.standardHours + entry.overtimeHours, 0).toFixed(1)} hours
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">OVERDUE (&gt;3 DAYS)</p>
                <p className="text-3xl font-bold text-red-900 dark:text-red-100">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 dark:text-green-300 text-sm font-medium">APPROVAL RATE</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{approvalRate}%</p>
                <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1 mt-2">
                  <div className="bg-green-600 dark:bg-green-400 h-1 rounded-full" style={{ width: `${approvalRate}%` }}></div>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">APPROVED TODAY</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{approvedToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pending">Pending</option>
                <option value="all">All</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Week Jun 03 - Jun 09">Week Jun 03 - Jun 09</option>
                <option value="Week May 27 - Jun 02">Week May 27 - Jun 02</option>
                <option value="Week May 20 - May 26">Week May 20 - May 26</option>
              </select>

              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All Employees">All Employees</option>
                <option value="JS001">John Smith (JS001)</option>
                <option value="SJ002">Sarah Johnson (SJ002)</option>
                <option value="MD003">Mike Davis (MD003)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                Bulk Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timesheet Entries List */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-white">Timesheet Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {mockEntries
                .filter(entry => statusFilter === "all" || entry.status === statusFilter)
                .map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                    selectedEntry?.id === entry.id
                      ? "border-blue-400 bg-blue-400/10"
                      : "border-white/10"
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{entry.employeeName}</h3>
                      <p className="text-gray-400 text-sm">{entry.date} • {entry.project}</p>
                      <p className="text-gray-500 text-xs">
                        Std: {entry.standardHours}h | OT: {entry.overtimeHours}h
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                      {entry.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(entry.id);
                            }}
                          >
                            ✓
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                                onClick={(e) => e.stopPropagation()}
                              >
                                ✗
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-900 border-white/20">
                              <DialogHeader>
                                <DialogTitle className="text-white">Reject Timesheet Entry</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-gray-400">
                                  Please provide a reason for rejecting this timesheet entry.
                                </p>
                                <textarea
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  placeholder="Enter rejection reason..."
                                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                                  rows={3}
                                />
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button
                                    onClick={() => handleReject(entry.id, rejectReason)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Confirm Rejection
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Entry Details Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-white">Entry Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEntry ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Employee</p>
                    <p className="text-white">{selectedEntry.employeeName}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date</p>
                    <p className="text-white">{new Date(selectedEntry.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Project</p>
                    <p className="text-white">{selectedEntry.projectCode} - {selectedEntry.project}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Standard Hours</p>
                      <p className="text-2xl font-bold text-white">{selectedEntry.standardHours}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Overtime Hours</p>
                      <p className="text-2xl font-bold text-orange-400">{selectedEntry.overtimeHours}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-white text-sm">{selectedEntry.notes}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-xs">
                      Submitted by {selectedEntry.submittedBy} on {selectedEntry.submittedDate}
                    </p>
                  </div>

                  {selectedEntry.status === 'pending' && (
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <textarea
                        placeholder="Add approval comments..."
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                      />
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          onClick={() => handleApprove(selectedEntry.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Entry
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Entry
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-900 border-white/20">
                            <DialogHeader>
                              <DialogTitle className="text-white">Reject Timesheet Entry</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-gray-400">
                                Please provide a reason for rejecting this timesheet entry.
                              </p>
                              <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Enter rejection reason..."
                                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                                rows={3}
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button
                                  onClick={() => handleReject(selectedEntry.id, rejectReason)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Confirm Rejection
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          onClick={() => handleRequestChanges(selectedEntry.id)}
                          variant="outline" 
                          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Request Changes
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Select a timesheet entry to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Approval Activity */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 mt-6">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Recent Approval Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">Emily Chen (EC004)</span>
              </div>
              <p className="text-gray-400 text-sm">Approved • 6.0 hours</p>
              <p className="text-gray-500 text-xs mt-2">Jun 08, 10:15 AM</p>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-white font-medium">David Wilson (DW005)</span>
              </div>
              <p className="text-gray-400 text-sm">Rejected • 10.0 hours</p>
              <p className="text-gray-500 text-xs mt-2">Jun 08, 9:30 AM</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">Lisa Brown (LB006)</span>
              </div>
              <p className="text-gray-400 text-sm">Approved • 8.0 hours</p>
              <p className="text-gray-500 text-xs mt-2">Jun 07, 4:45 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerApproval;
