
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingState } from '@/components/ui/loading';
import { ProjectsHeader } from '@/components/Projects/ProjectsHeader';
import { ProjectsViewControls } from '@/components/Projects/ProjectsViewControls';
import { ProjectsListView } from '@/components/Projects/ProjectsListView';
import { ProjectsCardView } from '@/components/Projects/ProjectsCardView';
import { ProjectsTileView } from '@/components/Projects/ProjectsTileView';
import { Project, ViewMode, SortBy, FilterBy, mockProjects } from '@/components/Projects/types';

const Projects = () => {
  console.log('Projects component rendering...');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('number');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    console.log('Loading projects on mount...');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
      console.log('Projects loaded:', mockProjects.length);
    }, 500);
  }, []);

  // Apply filtering
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || project.status === filterBy;
    
    return matchesSearch && matchesFilter;
  });

  // Apply sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'number':
        return a.code.localeCompare(b.code, undefined, { numeric: true });
      case 'name':
        return a.name.localeCompare(b.name);
      case 'manager':
        return a.manager.localeCompare(b.manager);
      default:
        return 0;
    }
  });

  const handleIconClick = (action: string, projectId: string) => {
    console.log('Icon clicked:', action, projectId);
    switch (action) {
      case 'daily-reports':
        navigate('/daily-reporting');
        break;
      case 'time-log':
        navigate('/log');
        break;
      case 'edit':
        console.log(`Edit project ${projectId}`);
        break;
    }
  };

  const renderProjectsView = () => {
    switch (viewMode) {
      case 'list':
        return (
          <ProjectsListView
            projects={sortedProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      case 'card':
        return (
          <ProjectsCardView
            projects={sortedProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      case 'tile':
        return (
          <ProjectsTileView
            projects={sortedProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingState message="Loading projects..." />;
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader />
      
      <ProjectsViewControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      />

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6">
          {renderProjectsView()}
          
          {sortedProjects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Projects;
