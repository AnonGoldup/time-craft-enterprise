
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
        return "bg-green-500/20 text-green-400 border-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400";
    }
  };

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-white text-lg">{project.code}</CardTitle>
            <p className="text-gray-300 text-sm">{project.name}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-300">
          <Building className="h-4 w-4" />
          <span className="text-sm">{project.client}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-300">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{project.hours} hours logged</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <Badge variant="outline" className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
          <Button 
            size="sm" 
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Log Time
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
