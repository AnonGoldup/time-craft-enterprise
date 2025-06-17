
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
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
