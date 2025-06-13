
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Users, BarChart3, Settings, Plus, Play, Pause, Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EnhancedTimeEntryForm from "@/components/EnhancedTimeEntryForm";
import WeeklySummary from "@/components/WeeklySummary";
import ProjectCard from "@/components/ProjectCard";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  const { user, logout, isManager } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [isClockingIn, setIsClockingIn] = useState(false);

  const mockProjects = [
    { code: "PROJ001", name: "Office Building Renovation", client: "ABC Corp", hours: 42.5, status: "active" },
    { code: "PROJ002", name: "Shopping Mall Construction", client: "XYZ Development", hours: 38.0, status: "active" },
    { code: "PROJ003", name: "Residential Complex", client: "Home Builders Inc", hours: 35.5, status: "pending" },
  ];

  const recentEntries = [
    { date: "2024-06-01", project: "PROJ001", hours: 8.0, status: "approved" },
    { date: "2024-05-31", project: "PROJ002", hours: 7.5, status: "pending" },
    { date: "2024-05-30", project: "PROJ001", hours: 8.0, status: "approved" },
  ];

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null; // This should not happen due to ProtectedRoute, but adding for safety
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TimeSheet Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isManager() && (
                <Link to="/manager-approval">
                  <Button
                    variant="outline"
                    className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Manager Portal
                  </Button>
                </Link>
              )}
              <Button
                variant={isClockingIn ? "destructive" : "default"}
                onClick={() => setIsClockingIn(!isClockingIn)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                {isClockingIn ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isClockingIn ? "Clock Out" : "Clock In"}
              </Button>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {user.fullName}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "entry", label: "Time Entry", icon: Plus },
              { id: "projects", label: "Projects", icon: Users },
              { id: "reports", label: "Reports", icon: Calendar },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeView === item.id
                    ? "border-blue-400 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === "dashboard" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm">This Week</p>
                      <p className="text-2xl font-bold text-white">42.5h</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-xl border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-200 text-sm">Today</p>
                      <p className="text-2xl font-bold text-white">8.0h</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-200 text-sm">Active Projects</p>
                      <p className="text-2xl font-bold text-white">3</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl border-orange-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-200 text-sm">Pending</p>
                      <p className="text-2xl font-bold text-white">2</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
              
              {/* Weekly Summary */}
              <div className="lg:col-span-2">
                <WeeklySummary />
              </div>
            </div>

            {/* Recent Entries */}
            <Card className="bg-black/20 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Time Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEntries.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <p className="text-white font-medium">{entry.project}</p>
                          <p className="text-gray-400 text-sm">{entry.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-medium">{entry.hours}h</span>
                        <Badge variant={entry.status === "approved" ? "default" : "secondary"}>
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "entry" && <EnhancedTimeEntryForm />}

        {activeView === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Active Projects</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <ProjectCard key={project.code} project={project} />
              ))}
            </div>
          </div>
        )}

        {activeView === "reports" && (
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Reports feature coming soon...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === "settings" && (
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Settings panel coming soon...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
