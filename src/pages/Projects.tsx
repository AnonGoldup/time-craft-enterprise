import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Grid3X3, 
  List, 
  LayoutGrid,
  Clipboard,
  Clock,
  Pen,
  User,
  Building
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingState } from '@/components/ui/loading';

interface Project {
  id: string;
  code: string;
  name: string;
  status: 'OPEN' | 'COMPLETE';
  manager: string;
  category: string;
  estimatedHours: number;
  actualHours: number;
}

const mockProjects: Project[] = [
  { id: '1', code: '000', name: 'VOID JOB', status: 'COMPLETE', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '2', code: '001', name: 'Template Project 2019', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '3', code: '002', name: 'Template Solar Projects 2019', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '4', code: '003', name: '*VOID* Template OLD Projects', status: 'COMPLETE', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '5', code: '004', name: 'Template Special Projects', status: 'OPEN', manager: 'Tyler Segin', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '6', code: '005', name: 'Service Projects', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '7', code: '006', name: 'Overhead Project Template', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '8', code: '007', name: 'IPD Project Template', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '9', code: '16-0020', name: 'Borden Park Pool', status: 'COMPLETE', manager: 'Drew Yeoman', category: 'Commercial', estimatedHours: 2, actualHours: 4080 },
];

type ViewMode = 'list' | 'card' | 'tile';

const Projects = () => {
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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const startIndex = (page - 1) * projectsPerPage;
      const endIndex = startIndex + projectsPerPage;
      const newProjects = mockProjects.slice(startIndex, endIndex);
      
      if (page === 1) {
        setProjects(newProjects);
      } else {
        setProjects(prev => [...prev, ...newProjects]);
      }
      
      setHasMore(endIndex < mockProjects.length);
      setLoading(false);
    }, 500);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      loadProjects();
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconClick = (action: string, projectId: string) => {
    switch (action) {
      case 'daily-reports':
        navigate('/daily-reporting');
        break;
      case 'time-log':
        navigate('/log');
        break;
      case 'edit':
        // Navigate to edit project page (to be implemented)
        console.log(`Edit project ${projectId}`);
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'OPEN' ? (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">OPEN</Badge>
    ) : (
      <Badge className="bg-green-500/20 text-green-400 border-green-400">COMPLETE</Badge>
    );
  };

  const getHoursBadge = (actual: number, estimated: number) => {
    if (actual > estimated && estimated > 0) {
      return <Badge variant="destructive">{actual} hrs</Badge>;
    }
    return <Badge className="bg-green-500/20 text-green-400">{actual} hrs</Badge>;
  };

  const renderListView = () => (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{project.code} - {project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.category}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {project.manager}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell>
                <div>
                  <div className="text-sm text-muted-foreground">Est. Hours {project.estimatedHours}</div>
                  {getHoursBadge(project.actualHours, project.estimatedHours)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleIconClick('daily-reports', project.id)}
                    className="h-8 w-8"
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleIconClick('time-log', project.id)}
                    className="h-8 w-8"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleIconClick('edit', project.id)}
                      className="h-8 w-8"
                    >
                      <Pen className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <Card key={project.id} className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{project.code}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{project.name}</p>
              </div>
              {getStatusBadge(project.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="text-sm">{project.manager}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span className="text-sm">{project.category}</span>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Est. Hours {project.estimatedHours}</div>
              {getHoursBadge(project.actualHours, project.estimatedHours)}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleIconClick('daily-reports', project.id)}
                className="flex-1"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleIconClick('time-log', project.id)}
                className="flex-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                Time Log
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleIconClick('edit', project.id)}
                >
                  <Pen className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTileView = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {filteredProjects.map((project) => (
        <Card key={project.id} className="bg-card border-border hover:border-border/60 transition-colors">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium">{project.code}</div>
              <div className="text-xs text-muted-foreground truncate">{project.name}</div>
              {getStatusBadge(project.status)}
              <div className="flex justify-center gap-1 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleIconClick('daily-reports', project.id)}
                  className="h-6 w-6"
                >
                  <Clipboard className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleIconClick('time-log', project.id)}
                  className="h-6 w-6"
                >
                  <Clock className="h-3 w-3" />
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleIconClick('edit', project.id)}
                    className="h-6 w-6"
                  >
                    <Pen className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading && projects.length === 0) {
    return <LoadingState message="Loading projects..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and view all your projects</p>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'tile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('tile')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Display */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6">
          {viewMode === 'list' && renderListView()}
          {viewMode === 'card' && renderCardView()}
          {viewMode === 'tile' && renderTileView()}
          
          {/* Load More Button */}
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
