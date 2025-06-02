
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp } from "lucide-react";

const WeeklySummary = () => {
  const weekData = [
    { day: "Mon", date: "Jun 3", hours: 8.0, status: "complete" },
    { day: "Tue", date: "Jun 4", hours: 8.5, status: "complete" },
    { day: "Wed", date: "Jun 5", hours: 7.5, status: "complete" },
    { day: "Thu", date: "Jun 6", hours: 8.0, status: "complete" },
    { day: "Fri", date: "Jun 7", hours: 8.0, status: "current" },
    { day: "Sat", date: "Jun 8", hours: 0.0, status: "future" },
    { day: "Sun", date: "Jun 9", hours: 0.0, status: "future" },
  ];

  const totalHours = weekData.reduce((sum, day) => sum + day.hours, 0);
  const progressPercentage = (totalHours / 40) * 100;

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Summary</span>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400">
            Week of June 3-9
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Progress</span>
            <span className="text-white font-medium">{totalHours}h / 40h</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>0h</span>
            <span className="flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {progressPercentage.toFixed(0)}% complete
            </span>
            <span>40h</span>
          </div>
        </div>

        {/* Daily Breakdown */}
        <div className="grid grid-cols-7 gap-2">
          {weekData.map((day) => (
            <div
              key={day.day}
              className={`p-3 rounded-lg text-center transition-all duration-200 hover:scale-105 ${
                day.status === "current"
                  ? "bg-blue-500/30 border border-blue-400"
                  : day.status === "complete"
                  ? "bg-green-500/20 border border-green-400/50"
                  : "bg-gray-500/10 border border-gray-500/30"
              }`}
            >
              <div className="text-xs text-gray-400 mb-1">{day.day}</div>
              <div className="text-xs text-gray-300 mb-2">{day.date}</div>
              <div className="flex items-center justify-center space-x-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className={`text-sm font-medium ${
                  day.status === "current" ? "text-blue-400" :
                  day.status === "complete" ? "text-white" : "text-gray-500"
                }`}>
                  {day.hours}h
                </span>
              </div>
              {day.status === "current" && (
                <div className="mt-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{totalHours}h</div>
            <div className="text-xs text-gray-400">Total This Week</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">8.0h</div>
            <div className="text-xs text-gray-400">Daily Average</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">{40 - totalHours}h</div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySummary;
