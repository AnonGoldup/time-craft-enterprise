
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Route to breadcrumb mapping
const routeToBreadcrumb: Record<string, BreadcrumbItem[]> = {
  '/': [],
  '/time-entry/standard': [
    { label: 'Timesheets', href: '/time-entry/standard' },
    { label: 'Standard Hours', current: true }
  ],
  '/time-entry/time-in-out': [
    { label: 'Timesheets', href: '/time-entry/standard' },
    { label: 'Time In/Out', current: true }
  ],
  '/log': [
    { label: 'Time Log', current: true }
  ],
  '/calendar': [
    { label: 'Calendar', current: true }
  ],
  '/documents': [
    { label: 'Documents', current: true }
  ],
  '/projects': [
    { label: 'Projects', current: true }
  ],
  '/daily-reporting': [
    { label: 'Daily Reporting', current: true }
  ],
  '/manager-approval': [
    { label: 'Manager Approval', current: true }
  ],
  '/team': [
    { label: 'Team Management', current: true }
  ],
  '/reports': [
    { label: 'Reports', current: true }
  ],
  '/company-settings': [
    { label: 'Company Settings', current: true }
  ],
  '/export-payroll': [
    { label: 'Export Payroll', current: true }
  ]
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const location = useLocation();
  
  // Use provided items or generate from current route
  const breadcrumbItems = items || routeToBreadcrumb[location.pathname] || [];
  
  // Don't show breadcrumbs on home page or if no items
  if (location.pathname === '/' || breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground mb-6', className)}
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
          {item.current ? (
            <span 
              className="text-foreground font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : item.href ? (
            <Link 
              to={item.href}
              className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
