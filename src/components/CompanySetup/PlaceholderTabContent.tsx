
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderTabContentProps {
  title: string;
  description: string;
}

export const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{title} configuration options will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
};
