
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings2 } from 'lucide-react';

const AddSystem = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings2 className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add System</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure system types and classifications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Add a new system type to the database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input id="systemName" placeholder="Enter system name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemCode">System Code</Label>
              <Input id="systemCode" placeholder="Enter system code" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter system description" rows={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">System Category</Label>
              <Input id="category" placeholder="Enter system category" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" placeholder="Enter system version" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Add System</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSystem;
