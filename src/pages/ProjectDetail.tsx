
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, User, Building } from 'lucide-react';
import { LoadingState } from '@/components/ui/loading';
import { ProjectBudgetSection } from '@/components/ProjectDetail/ProjectBudgetSection';
import { ProjectFieldNotes } from '@/components/ProjectDetail/ProjectFieldNotes';
import { ProjectModules } from '@/components/ProjectDetail/ProjectModules';
import { Project, mockProjects } from '@/components/Projects/types';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      // Simulate API call to fetch project details
      setTimeout(() => {
        const foundProject = mockProjects.find(p => p.id === projectId);
        setProject(foundProject || null);
        setLoading(false);
      }, 500);
    }
  }, [projectId]);

  if (loading) {
    return <LoadingState message="Loading project details..." />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">Project Not Found</h2>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  // Mock weather data
  const weatherData = [
    { day: 'Today', date: '06/17', temp: '14 - 28°', icon: '☀️' },
    { day: 'Tomorrow', date: '06/18', temp: '13 - 25°', icon: '🌧️' },
    { day: 'Thursday', date: '06/19', temp: '14 - 21°', icon: '🌧️' },
    { day: 'Friday', date: '06/20', temp: '11 - 19°', icon: '☁️' },
    { day: 'Saturday', date: '06/21', temp: '10 - 16°', icon: '🌧️' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building className="h-8 w-8 text-orange-500" />
              {project.code} - {project.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Weather Strip */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            {weatherData.map((weather, index) => (
              <div key={index} className="flex flex-col items-center text-sm">
                <div className="font-medium">{weather.day}</div>
                <div className="text-muted-foreground">{weather.date}</div>
                <div className="text-2xl my-2">{weather.icon}</div>
                <div className="text-xs">{weather.temp}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="font-medium">Status:</span>
              <span className="ml-2 text-blue-600">{project.status}</span>
            </div>
            <div>
              <span className="font-medium">Occupancy Type:</span>
              <span className="ml-2">009 - School</span>
            </div>
            <div>
              <span className="font-medium">Division:</span>
              <span className="ml-2">DIV001 - Design-Build</span>
            </div>
            <div>
              <span className="font-medium">Project Manager:</span>
              <span className="ml-2 flex items-center gap-1">
                <User className="h-4 w-4" />
                {project.manager}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Project Address:</span>
            <span className="text-blue-600">12 Cunningham Rd, St. Albert, AB, T8N 2E9</span>
          </div>
        </CardContent>
      </Card>

      {/* Budget Section */}
      <ProjectBudgetSection />

      {/* Field Notes */}
      <ProjectFieldNotes />

      {/* Modules */}
      <ProjectModules />
    </div>
  );
};

export default ProjectDetail;
