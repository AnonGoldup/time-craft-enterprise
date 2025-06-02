
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Calendar, FileText, Download, Upload } from "lucide-react";
import { toast } from "sonner";

const QuickActions = () => {
  const handleAction = (action: string) => {
    toast.success(`${action} action triggered!`);
  };

  const actions = [
    {
      icon: Plus,
      label: "Quick Entry",
      description: "Add time entry for today",
      color: "from-blue-500 to-blue-600",
      action: "Quick Entry"
    },
    {
      icon: Clock,
      label: "Clock In/Out",
      description: "Track time automatically",
      color: "from-green-500 to-green-600",
      action: "Clock In/Out"
    },
    {
      icon: Calendar,
      label: "Weekly View",
      description: "View weekly timesheet",
      color: "from-purple-500 to-purple-600",
      action: "Weekly View"
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Create timesheet report",
      color: "from-orange-500 to-orange-600",
      action: "Generate Report"
    },
    {
      icon: Download,
      label: "Export Data",
      description: "Export to Sage 300",
      color: "from-red-500 to-red-600",
      action: "Export Data"
    },
    {
      icon: Upload,
      label: "Import Hours",
      description: "Bulk import time entries",
      color: "from-indigo-500 to-indigo-600",
      action: "Import Hours"
    }
  ];

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 justify-start border-white/10 hover:border-white/20 group"
              onClick={() => handleAction(action.action)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">{action.label}</div>
                  <div className="text-gray-400 text-xs">{action.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
