
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Activity } from 'lucide-react';

const AddPhase = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Phase</h1>
          <p className="text-gray-600 dark:text-gray-400">Define project phases and workflow stages</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phase Configuration</CardTitle>
          <CardDescription>Create a new project phase or workflow stage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phaseName">Phase Name</Label>
              <Input id="phaseName" placeholder="Enter phase name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phaseCode">Phase Code</Label>
              <Input id="phaseCode" placeholder="Enter phase code" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter phase description" rows={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input id="order" type="number" placeholder="Enter phase order" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input id="duration" type="number" placeholder="Enter duration" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color Code</Label>
              <Input id="color" type="color" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Add Phase</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPhase;
