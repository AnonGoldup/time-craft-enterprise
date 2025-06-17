
import React from 'react';

export const ProjectsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground mt-1">Manage and view all your projects</p>
      </div>
    </div>
  );
};
