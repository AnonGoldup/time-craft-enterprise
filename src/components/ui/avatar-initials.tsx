
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarInitialsProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarInitials: React.FC<AvatarInitialsProps> = ({
  name,
  className,
  size = 'md'
}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  };

  return (
    <div className={cn(
      'bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold',
      sizeClasses[size],
      className
    )}>
      {getInitials(name)}
    </div>
  );
};
