
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Save, Send } from "lucide-react";
import { toast } from "sonner";

const TimeEntryForm = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      project: "",
      costCode: "",
      extra: "",
      standardHours: "",
      overtimeHours: "",
      notes: ""
    }
  ]);

  const projects = [
    { code: "PROJ001", name: "Office Building Renovation" },
    { code: "PROJ002", name: "Shopping Mall Construction" },
    { code: "PROJ003", name: "Residential Complex" }
  ];

  const costCodes = [
    { code: "LAB001", name: "General Labor" },
    { code: "EQP001", name: "Equipment Operation" },
    { code: "MAT001", name: "Material Handling" },
    { code: "SUP001", name: "Supervision" }
  ];

  const extras = [
    { code: "REG", name: "Regular Work" },
    { code: "TRV", name: "Travel Time" },
    { code: "MTG", name: "Meeting/Training" }
  ];

  const addEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      project: "",
      costCode: "",
      extra: "",
      standardHours: "",
      overtimeHours: "",
      notes: ""
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: number, field: string, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const copyLastEntry = () => {
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const newEntry = {
        ...lastEntry,
        id: entries.length + 1,
        date: new Date().toISOString().split('T')[0],
        standardHours: "",
        overtimeHours: "",
        notes: ""
      };
      setEntries([...entries, newEntry]);
      toast.success("Copied last entry settings");
    }
  };

  const setQuickHours = (entryId: number, hours: number) => {
    updateEntry(entryId, 'standardHours', hours.toString());
  };

  const handleSubmit = () => {
    toast.success("Time entries submitted successfully!");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Time Entry</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={copyLastEntry}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Last
          </Button>
          <Button variant="outline" onClick={addEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <Card key={entry.id} className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Entry #{entry.id}
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {entry.date}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date and Employee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`date-${entry.id}`} className="text-gray-300">Date</Label>
                  <Input
                    id={`date-${entry.id}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Employee</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="John Doe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Selection */}
              <div>
                <Label className="text-gray-300">Project</Label>
                <Select value={entry.project} onValueChange={(value) => updateEntry(entry.id, 'project', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select project..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.code} value={project.code}>
                        {project.code} - {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cost Code and Extra */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Cost Code</Label>
                  <Select value={entry.costCode} onValueChange={(value) => updateEntry(entry.id, 'costCode', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select cost code..." />
                    </SelectTrigger>
                    <SelectContent>
                      {costCodes.map((code) => (
                        <SelectItem key={code.code} value={code.code}>
                          {code.code} - {code.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Extra</Label>
                  <Select value={entry.extra} onValueChange={(value) => updateEntry(entry.id, 'extra', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select extra..." />
                    </SelectTrigger>
                    <SelectContent>
                      {extras.map((extra) => (
                        <SelectItem key={extra.code} value={extra.code}>
                          {extra.code} - {extra.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`standard-${entry.id}`} className="text-gray-300">Standard Hours</Label>
                  <Input
                    id={`standard-${entry.id}`}
                    type="number"
                    step="0.5"
                    value={entry.standardHours}
                    onChange={(e) => updateEntry(entry.id, 'standardHours', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="8.0"
                  />
                </div>
                <div>
                  <Label htmlFor={`overtime-${entry.id}`} className="text-gray-300">Overtime Hours</Label>
                  <Input
                    id={`overtime-${entry.id}`}
                    type="number"
                    step="0.5"
                    value={entry.overtimeHours}
                    onChange={(e) => updateEntry(entry.id, 'overtimeHours', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Quick Hour Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 8)}
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  8 hrs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 10)}
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                >
                  10 hrs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickHours(entry.id, 12)}
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  12 hrs
                </Button>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor={`notes-${entry.id}`} className="text-gray-300">Notes</Label>
                <Textarea
                  id={`notes-${entry.id}`}
                  value={entry.notes}
                  onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Add any additional notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSaveDraft}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Entries
        </Button>
      </div>
    </div>
  );
};

export default TimeEntryForm;
