
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Building2, Users, FileText, Database, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsSections = [
    {
      title: "Company Setup",
      description: "Configure company information and preferences",
      items: [
        { name: "Company Setup", path: "/settings/company-setup", icon: Building2 },
        { name: "Add Division", path: "/settings/add-division", icon: Plus },
        { name: "Add Occupancy Type", path: "/settings/add-occupancy-type", icon: FileText },
        { name: "Add Project", path: "/settings/add-project", icon: Building2 },
        { name: "Add System", path: "/settings/add-system", icon: Database },
        { name: "Add Phase", path: "/settings/add-phase", icon: FileText }
      ]
    },
    {
      title: "User Management",
      description: "Manage users and employees",
      items: [
        { name: "Add User", path: "/settings/add-user", icon: Users },
        { name: "User Log", path: "/settings/user-log", icon: FileText },
        { name: "Users Logged On", path: "/settings/users-logged-on", icon: Users },
        { name: "Add Employee", path: "/settings/add-employee", icon: Plus },
        { name: "Employee Log", path: "/settings/employee-log", icon: FileText }
      ]
    },
    {
      title: "Data Management",
      description: "Export and manage system data",
      items: [
        { name: "Export Payroll", path: "/export-payroll", icon: Download }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure system settings and preferences</p>
        </div>
      </div>

      {/* Compact Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{section.title}</CardTitle>
              <CardDescription className="text-xs">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    asChild
                    variant="outline"
                    className="h-auto p-3 justify-start hover:bg-muted/50"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
