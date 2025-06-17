
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
import { Project, ViewMode, mockProjects } from '@/components/Projects/types';

const Projects = () => {
  console.log('Projects component rendering...');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const isAdmin = user?.role === 'admin';
  const projectsPerPage = 20;

  const loadProjects = (currentPage: number = 1) => {
    console.log('loadProjects called, page:', currentPage);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const startIndex = (currentPage - 1) * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      const newProjects = mockProjects.slice(startIndex, endIndex);
      
      if (currentPage === 1) {
        setProjects(newProjects);
      } else {
        setProjects(prev => [...prev, ...newProjects]);
      }
      
      setHasMore(endIndex < mockProjects.length);
      setLoading(false);
      console.log('Projects loaded:', newProjects.length);
    }, 500);
  };

  useEffect(() => {
    console.log('Loading projects on mount...');
    loadProjects(1);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProjects(nextPage);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            projects={filteredProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      case 'card':
        return (
          <ProjectsCardView
            projects={filteredProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      case 'tile':
        return (
          <ProjectsTileView
            projects={filteredProjects}
            isAdmin={isAdmin}
            onIconClick={handleIconClick}
          />
        );
      default:
        return null;
    }
  };

  if (loading && projects.length === 0) {
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
      />

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6">
          {renderProjectsView()}
          
          {hasMore && (
            <div className="flex justify-center pt-6">
              <Button 
                variant="outline" 
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Projects'}
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Projects;
