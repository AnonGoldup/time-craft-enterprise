
import React, { useState } from "react";
import { toast } from "sonner";
import { MetricsCards } from "@/components/ManagerApproval/MetricsCards";
import { FilterControls } from "@/components/ManagerApproval/FilterControls";
import { TimesheetEntryList } from "@/components/ManagerApproval/TimesheetEntryList";
import { EntryDetailsPanel } from "@/components/ManagerApproval/EntryDetailsPanel";
import { RecentActivity } from "@/components/ManagerApproval/RecentActivity";

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
      project: "Electrical Installation Project",
      projectCode: "EIP-2025-01",
      date: "2024-06-03",
      standardHours: 8.0,
      overtimeHours: 2.0,
      status: "pending",
      notes: "Worked extra hours to complete electrical panel installation for the upcoming inspection deadline.",
      submittedDate: "Jun 03, 2025 6:45 PM",
      submittedBy: "sarah.johnson@company.com"
    },
    {
      id: "2",
      employeeName: "John Smith",
      employeeId: "JS001",
      project: "Commercial Wiring Project",
      projectCode: "CWP-2025-02",
      date: "2024-06-04",
      standardHours: 7.5,
      overtimeHours: 0.0,
      status: "pending",
      notes: "Standard electrical wiring work on commercial building.",
      submittedDate: "Jun 04, 2025 5:30 PM",
      submittedBy: "john.smith@company.com"
    },
    {
      id: "3",
      employeeName: "Mike Davis",
      employeeId: "MD003",
      project: "Industrial Electrical Upgrade",
      projectCode: "IEU-2025-03",
      date: "2024-06-05",
      standardHours: 8.0,
      overtimeHours: 3.0,
      status: "pending",
      notes: "Extended hours for industrial electrical system upgrade.",
      submittedDate: "Jun 05, 2025 7:15 PM",
      submittedBy: "mike.davis@company.com"
    },
    {
      id: "4",
      employeeName: "Emily Chen",
      employeeId: "EC004",
      project: "Electrical Safety Inspection",
      projectCode: "ESI-2025-04",
      date: "2024-06-06",
      standardHours: 6.0,
      overtimeHours: 0.0,
      status: "approved",
      notes: "Electrical safety inspection and documentation.",
      submittedDate: "Jun 06, 2025 4:00 PM",
      submittedBy: "emily.chen@company.com"
    }
  ];

  const pendingEntries = mockEntries.filter(entry => entry.status === 'pending');
  const totalHours = pendingEntries.reduce((sum, entry) => sum + entry.standardHours + entry.overtimeHours, 0);
  
  const overdueCount = 8;
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Timesheet Approval Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Review and approve employee timesheet entries</p>
      </div>

      <MetricsCards
        pendingCount={pendingEntries.length}
        overdueCount={overdueCount}
        approvalRate={approvalRate}
        approvedToday={approvedToday}
        totalHours={totalHours}
      />

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TimesheetEntryList
            entries={mockEntries}
            statusFilter={statusFilter}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
            onApprove={handleApprove}
            onReject={handleReject}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
          />
        </div>

        <div className="lg:col-span-1">
          <EntryDetailsPanel
            selectedEntry={selectedEntry}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestChanges={handleRequestChanges}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
          />
        </div>
      </div>

      <RecentActivity />
    </div>
  );
};

export default ManagerApproval;
