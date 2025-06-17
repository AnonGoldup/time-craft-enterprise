
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div 
      className={cn(
        'border-2 border-primary/20 border-t-primary rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...', 
  className 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-8 space-y-4', className)}>
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};
