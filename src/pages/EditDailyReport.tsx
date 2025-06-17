
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface CrewEntry {
  id: string;
  employee: string;
  st: number;
  ot: number;
  lost: number;
  work: string;
  comments: string;
}

interface SubcontractorEntry {
  id: string;
  subcontractor: string;
  workers: number;
  comments: string;
}

interface EquipmentEntry {
  id: string;
  equipment: string;
  hours: number;
  notes: string;
}

interface MaterialEntry {
  id: string;
  material: string;
  quantity: number;
  per: string;
  notes: string;
}

const EditDailyReport: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customNumber: '',
    reportFrom: '16-0020 - Borden Park Pool',
    date: '06/10/2025',
    weather: 'Cloudy',
    timeOnSite: '7:00 AM',
    wind: 'Light Breeze',
    timeOffSite: '4:00 PM',
    temperature: '15',
    totalWorkers: 3
  });

  const [crewEntries, setCrewEntries] = useState<CrewEntry[]>([
    { id: '1', employee: 'Quinn, Brandon - QUINN, B', st: 8, ot: 0, lost: 0, work: 'Travel Time', comments: '' },
    { id: '2', employee: 'Korver, Mark - KORVER, M', st: 8, ot: 0, lost: 0, work: 'Travel Time', comments: '' },
    { id: '3', employee: 'Nielsen, Catherine - NIELSEN', st: 6, ot: 0, lost: 0, work: 'Travel Time', comments: '' }
  ]);

  const [subcontractors, setSubcontractors] = useState<SubcontractorEntry[]>([]);
  const [equipment, setEquipment] = useState<EquipmentEntry[]>([]);
  const [materials, setMaterials] = useState<MaterialEntry[]>([]);

  const [comments, setComments] = useState('');
  const [issues, setIssues] = useState('');

  const addCrewEntry = () => {
    const newEntry: CrewEntry = {
      id: Date.now().toString(),
      employee: '',
      st: 0,
      ot: 0,
      lost: 0,
      work: '',
      comments: ''
    };
    setCrewEntries([...crewEntries, newEntry]);
  };

  const removeCrewEntry = (id: string) => {
    setCrewEntries(crewEntries.filter(entry => entry.id !== id));
  };

  const updateCrewEntry = (id: string, field: keyof CrewEntry, value: string | number) => {
    setCrewEntries(crewEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addSubcontractor = () => {
    const newEntry: SubcontractorEntry = {
      id: Date.now().toString(),
      subcontractor: '',
      workers: 0,
      comments: ''
    };
    setSubcontractors([...subcontractors, newEntry]);
  };

  const addEquipment = () => {
    const newEntry: EquipmentEntry = {
      id: Date.now().toString(),
      equipment: '',
      hours: 0,
      notes: ''
    };
    setEquipment([...equipment, newEntry]);
  };

  const addMaterial = () => {
    const newEntry: MaterialEntry = {
      id: Date.now().toString(),
      material: '',
      quantity: 0,
      per: '',
      notes: ''
    };
    setMaterials([...materials, newEntry]);
  };

  const handleSave = () => {
    console.log('Saving daily report...', {
      formData,
      crewEntries,
      subcontractors,
      equipment,
      materials,
      comments,
      issues
    });
    navigate('/daily-reporting');
  };

  const getTotalHours = (type: 'st' | 'ot' | 'lost') => {
    return crewEntries.reduce((sum, entry) => sum + entry[type], 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/daily-reporting')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to DR Log
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit DR</h1>
            <p className="text-gray-600 dark:text-gray-400">Daily Report: {id}</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Data
        </Button>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Report Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Custom Number:</label>
              <Input
                value={formData.customNumber}
                onChange={(e) => setFormData({...formData, customNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Report From:</label>
              <Select value={formData.reportFrom} onValueChange={(value) => setFormData({...formData, reportFrom: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16-0020 - Borden Park Pool">16-0020 - Borden Park Pool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Date:</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Weather:</label>
              <Select value={formData.weather} onValueChange={(value) => setFormData({...formData, weather: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cloudy">Cloudy</SelectItem>
                  <SelectItem value="Sunny">Sunny</SelectItem>
                  <SelectItem value="Rainy">Rainy</SelectItem>
                  <SelectItem value="Snowy">Snowy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Wind:</label>
              <Select value={formData.wind} onValueChange={(value) => setFormData({...formData, wind: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Light Breeze">Light Breeze</SelectItem>
                  <SelectItem value="Calm">Calm</SelectItem>
                  <SelectItem value="Windy">Windy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Temperature:</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                />
                <span className="text-sm">°C</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Total Workers:</label>
              <Input
                type="number"
                value={formData.totalWorkers}
                onChange={(e) => setFormData({...formData, totalWorkers: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Time On Site:</label>
              <Input
                value={formData.timeOnSite}
                onChange={(e) => setFormData({...formData, timeOnSite: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time Off Site:</label>
              <Input
                value={formData.timeOffSite}
                onChange={(e) => setFormData({...formData, timeOffSite: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter comments..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Crews Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Crews</CardTitle>
          <Button onClick={addCrewEntry} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Line
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-700 hover:bg-blue-700">
                <TableHead className="text-white">Employee</TableHead>
                <TableHead className="text-white">ST</TableHead>
                <TableHead className="text-white">OT</TableHead>
                <TableHead className="text-white">Lost</TableHead>
                <TableHead className="text-white">Work</TableHead>
                <TableHead className="text-white">Comments</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crewEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Input
                      value={entry.employee}
                      onChange={(e) => updateCrewEntry(entry.id, 'employee', e.target.value)}
                      className="min-w-[200px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={entry.st}
                      onChange={(e) => updateCrewEntry(entry.id, 'st', parseInt(e.target.value) || 0)}
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={entry.ot}
                      onChange={(e) => updateCrewEntry(entry.id, 'ot', parseInt(e.target.value) || 0)}
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={entry.lost}
                      onChange={(e) => updateCrewEntry(entry.id, 'lost', parseInt(e.target.value) || 0)}
                      className="w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={entry.work}
                      onChange={(e) => updateCrewEntry(entry.id, 'work', e.target.value)}
                      className="min-w-[150px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={entry.comments}
                      onChange={(e) => updateCrewEntry(entry.id, 'comments', e.target.value)}
                      className="min-w-[200px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCrewEntry(entry.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableCell className="text-white font-bold">Total Hours:</TableCell>
                <TableCell className="text-white font-bold">{getTotalHours('st')}</TableCell>
                <TableCell className="text-white font-bold">{getTotalHours('ot')}</TableCell>
                <TableCell className="text-white font-bold">{getTotalHours('lost')}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subcontractors Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subcontractors</CardTitle>
          <Button onClick={addSubcontractor} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Subcontractor
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-700 hover:bg-blue-700">
                <TableHead className="text-white">Subcontractors</TableHead>
                <TableHead className="text-white">Workers</TableHead>
                <TableHead className="text-white">Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subcontractors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No subcontractors added
                  </TableCell>
                </TableRow>
              ) : (
                subcontractors.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Input value={entry.subcontractor} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={entry.workers} className="w-20" />
                    </TableCell>
                    <TableCell>
                      <Input value={entry.comments} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Equipment Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Equipment</CardTitle>
          <Button onClick={addEquipment} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Equipment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-700 hover:bg-blue-700">
                <TableHead className="text-white">Equipment</TableHead>
                <TableHead className="text-white">Hours</TableHead>
                <TableHead className="text-white">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No equipment added
                  </TableCell>
                </TableRow>
              ) : (
                equipment.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Input value={entry.equipment} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={entry.hours} className="w-20" />
                    </TableCell>
                    <TableCell>
                      <Input value={entry.notes} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Materials Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Materials</CardTitle>
          <Button onClick={addMaterial} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-700 hover:bg-blue-700">
                <TableHead className="text-white">Materials</TableHead>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Per</TableHead>
                <TableHead className="text-white">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No materials added
                  </TableCell>
                </TableRow>
              ) : (
                materials.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Input value={entry.material} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={entry.quantity} className="w-20" />
                    </TableCell>
                    <TableCell>
                      <Input value={entry.per} className="w-20" />
                    </TableCell>
                    <TableCell>
                      <Input value={entry.notes} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Issues Section */}
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="No issues on Project"
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Data
        </Button>
      </div>
    </div>
  );
};

export default EditDailyReport;
