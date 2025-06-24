
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Search, Plus, Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Electrician",
      email: "john.doe@company.com",
      phone: "(555) 123-4567",
      status: "Active",
      location: "Site A",
      hoursThisWeek: 38.5,
      lastActive: "2 hours ago",
      projects: ["Office Complex", "Residential Dev"]
    },
    {
      id: 2,
      name: "Jane Smith", 
      role: "Project Manager",
      email: "jane.smith@company.com",
      phone: "(555) 234-5678",
      status: "Active",
      location: "Office",
      hoursThisWeek: 42.0,
      lastActive: "30 minutes ago",
      projects: ["Office Complex", "Commercial Building"]
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Apprentice",
      email: "mike.johnson@company.com", 
      phone: "(555) 345-6789",
      status: "On Leave",
      location: "-",
      hoursThisWeek: 0,
      lastActive: "3 days ago",
      projects: ["Residential Dev"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'On Leave': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
          <p className="text-sm text-muted-foreground">Manage team members and track performance</p>
        </div>
        <Button asChild size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
          <Link to="/settings/add-employee">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Link>
        </Button>
      </div>

      {/* Compact Search */}
      <Card>
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Compact Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-sm transition-shadow border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <CardDescription className="text-xs">{member.role}</CardDescription>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Contact Info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.location}</span>
                </div>
              </div>

              {/* Hours & Activity */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.hoursThisWeek}h this week</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.lastActive}</span>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Projects:</span>
                <div className="flex flex-wrap gap-1">
                  {member.projects.map((project, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 h-8">
                  View Profile
                </Button>
                <Button size="sm" className="flex-1 h-8">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
