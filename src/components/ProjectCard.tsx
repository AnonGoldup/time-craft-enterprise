
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Building, User, MoreVertical } from "lucide-react";

interface Project {
  code: string;
  name: string;
  client: string;
  hours: number;
  status: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-600 border-green-200";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-200";
      case "completed":
        return "bg-blue-500/20 text-blue-600 border-blue-200";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-200";
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-border hover:shadow-md hover:border-border/60 transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-foreground text-lg font-semibold group-hover:text-primary transition-colors">
              {project.code}
            </CardTitle>
            <p className="text-muted-foreground text-sm">{project.name}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Building className="h-4 w-4 text-primary" />
          <span className="text-sm">{project.client}</span>
        </div>
        
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm">{project.hours} hours logged</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Badge 
            variant="outline" 
            className={`${getStatusColor(project.status)} border font-medium`}
          >
            {project.status}
          </Badge>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Log Time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
