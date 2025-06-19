
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, FolderPlus, Settings2, UserPlus, FileText, Activity, UserCheck } from 'lucide-react';

const CompanySettings = () => {
  const settingsCards = [
    {
      title: 'Company Setup',
      description: 'Configure basic company information and settings',
      icon: Building2,
      path: '/settings/company-setup',
      color: 'bg-primary/10 border-primary/20'
    },
    {
      title: 'Division Management',
      description: 'Add and manage company divisions',
      icon: FolderPlus,
      path: '/settings/add-division',
      color: 'bg-green-500/10 border-green-500/20'
    },
    {
      title: 'Occupancy Types',
      description: 'Define and manage occupancy classifications',
      icon: Settings2,
      path: '/settings/add-occupancy-type',
      color: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Project Management',
      description: 'Create and configure new projects',
      icon: FolderPlus,
      path: '/settings/add-project',
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      title: 'System Configuration',
      description: 'Add and manage system types',
      icon: Settings2,
      path: '/settings/add-system',
      color: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Phase Management',
      description: 'Define project phases and workflows',
      icon: Activity,
      path: '/settings/add-phase',
      color: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'User Management',
      description: 'Add and manage system users',
      icon: UserPlus,
      path: '/settings/add-user',
      color: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      title: 'User Activity Log',
      description: 'View user activity and audit trails',
      icon: FileText,
      path: '/settings/user-log',
      color: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      title: 'Active Users',
      description: 'Monitor currently logged in users',
      icon: Users,
      path: '/settings/users-logged-on',
      color: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      title: 'Employee Management',
      description: 'Add and manage employees',
      icon: UserCheck,
      path: '/settings/add-employee',
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Employee Activity Log',
      description: 'Track employee activity and changes',
      icon: FileText,
      path: '/settings/employee-log',
      color: 'bg-slate-500/10 border-slate-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Company Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your company configuration, users, and system settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => (
          <Link key={card.path} to={card.path} className="group">
            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 bg-card border-border hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted shadow-sm border border-border">
                    <card.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanySettings;
