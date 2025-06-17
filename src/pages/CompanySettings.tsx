
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
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    },
    {
      title: 'Division Management',
      description: 'Add and manage company divisions',
      icon: FolderPlus,
      path: '/settings/add-division',
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    },
    {
      title: 'Occupancy Types',
      description: 'Define and manage occupancy classifications',
      icon: Settings2,
      path: '/settings/add-occupancy-type',
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    },
    {
      title: 'Project Management',
      description: 'Create and configure new projects',
      icon: FolderPlus,
      path: '/settings/add-project',
      color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    },
    {
      title: 'System Configuration',
      description: 'Add and manage system types',
      icon: Settings2,
      path: '/settings/add-system',
      color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800'
    },
    {
      title: 'Phase Management',
      description: 'Define project phases and workflows',
      icon: Activity,
      path: '/settings/add-phase',
      color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
    },
    {
      title: 'User Management',
      description: 'Add and manage system users',
      icon: UserPlus,
      path: '/settings/add-user',
      color: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800'
    },
    {
      title: 'User Activity Log',
      description: 'View user activity and audit trails',
      icon: FileText,
      path: '/settings/user-log',
      color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    },
    {
      title: 'Active Users',
      description: 'Monitor currently logged in users',
      icon: Users,
      path: '/settings/users-logged-on',
      color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800'
    },
    {
      title: 'Employee Management',
      description: 'Add and manage employees',
      icon: UserCheck,
      path: '/settings/add-employee',
      color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
    },
    {
      title: 'Employee Activity Log',
      description: 'Track employee activity and changes',
      icon: FileText,
      path: '/settings/employee-log',
      color: 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your company configuration, users, and system settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => (
          <Link key={card.path} to={card.path} className="group">
            <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:scale-105 ${card.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm">
                    <card.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
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
