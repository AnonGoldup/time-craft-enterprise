
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Pause, Square } from 'lucide-react';

const TimeEntry = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Time Entry
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your time and manage your work hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Current Timer
            </CardTitle>
            <CardDescription>Start tracking your time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl font-mono font-bold mb-4">00:00:00</div>
              <div className="flex justify-center gap-2">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button variant="outline">
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Your time tracking for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Hours:</span>
                <span className="font-semibold">7.5h</span>
              </div>
              <div className="flex justify-between">
                <span>Billable Hours:</span>
                <span className="font-semibold">6.0h</span>
              </div>
              <div className="flex justify-between">
                <span>Break Time:</span>
                <span className="font-semibold">1.0h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeEntry;
