import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Plus, X, Trash2 } from 'lucide-react';
import { employeeApi, Employee } from '@/services/api';

interface CrewEntry {
  id: string;
  employee: string;
  st: number;
  ot: number;
  lost: number;
  work: string;
  comments: string;
}

interface Crew {
  id: string;
  name: string;
  costCode: string;
  workType: string;
  entries: CrewEntry[];
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

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [formData, setFormData] = useState({
    customNumber: '',
    reportFrom: '',
    date: '06/10/2025',
    weather: 'Cloudy',
    timeOnSite: '7:00 AM',
    wind: 'Light Breeze',
    timeOffSite: '4:00 PM',
    temperature: '15',
    totalWorkers: 3
  });

  // Initialize with one crew containing sample entries
  const [crews, setCrews] = useState<Crew[]>([
    {
      id: '1',
      name: 'Crew 1',
      costCode: '',
      workType: 'Base Contract',
      entries: [
        { id: '1', employee: '', st: 8, ot: 0, lost: 0, work: 'Travel Time', comments: '' },
        { id: '2', employee: '', st: 8, ot: 0, lost: 0, work: 'Travel Time', comments: '' },
        { id: '3', employee: '', st: 6, ot: 0, lost: 0, work: 'Travel Time', comments: '' }
      ]
    }
  ]);

  const [subcontractors, setSubcontractors] = useState<SubcontractorEntry[]>([]);
  const [equipment, setEquipment] = useState<EquipmentEntry[]>([]);
  const [materials, setMaterials] = useState<MaterialEntry[]>([]);

  const [comments, setComments] = useState('');
  const [issues, setIssues] = useState('');

  const [confirmDeleteCrewId, setConfirmDeleteCrewId] = useState<string | null>(null);

  // Generate time options in 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour < 12 ? 'AM' : 'PM';
        const timeString = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  // Work type options
  const workTypeOptions = [
    'Base Contract',
    'COR - Approved',
    'Field Work Order / T&M',
    'Price / Do Not Proceed',
    'Price / Proceed',
    'Work Under Protest'
  ];

  // Crew management functions
  const addCrew = () => {
    const newCrewNumber = crews.length + 1;
    const newCrew: Crew = {
      id: Date.now().toString(),
      name: `Crew ${newCrewNumber}`,
      costCode: '',
      workType: 'Base Contract',
      entries: []
    };
    setCrews([...crews, newCrew]);
  };

  const removeCrew = (crewId: string) => {
    if (crews.length > 1) {
      setCrews(crews.filter(crew => crew.id !== crewId));
      setConfirmDeleteCrewId(null);
    }
  };

  const updateCrew = (crewId: string, field: 'costCode' | 'workType', value: string) => {
    setCrews(crews.map(crew => 
      crew.id === crewId ? { ...crew, [field]: value } : crew
    ));
  };

  const addCrewEntry = (crewId: string) => {
    const newEntry: CrewEntry = {
      id: Date.now().toString(),
      employee: '',
      st: 0,
      ot: 0,
      lost: 0,
      work: '',
      comments: ''
    };
    
    setCrews(crews.map(crew => 
      crew.id === crewId 
        ? { ...crew, entries: [...crew.entries, newEntry] }
        : crew
    ));
  };

  const removeCrewEntry = (crewId: string, entryId: string) => {
    setCrews(crews.map(crew => 
      crew.id === crewId 
        ? { ...crew, entries: crew.entries.filter(entry => entry.id !== entryId) }
        : crew
    ));
  };

  const updateCrewEntry = (crewId: string, entryId: string, field: keyof CrewEntry, value: string | number) => {
    setCrews(crews.map(crew => 
      crew.id === crewId 
        ? {
            ...crew,
            entries: crew.entries.map(entry => 
              entry.id === entryId ? { ...entry, [field]: value } : entry
            )
          }
        : crew
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
      crews,
      subcontractors,
      equipment,
      materials,
      comments,
      issues
    });
    navigate('/daily-reporting');
  };

  const getTotalHoursForCrew = (crewId: string, type: 'st' | 'ot' | 'lost') => {
    const crew = crews.find(c => c.id === crewId);
    return crew ? crew.entries.reduce((sum, entry) => sum + entry[type], 0) : 0;
  };

  const getAllTotalHours = (type: 'st' | 'ot' | 'lost') => {
    return crews.reduce((total, crew) => 
      total + crew.entries.reduce((sum, entry) => sum + entry[type], 0), 0
    );
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const response = await employeeApi.getActive();
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

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
              <Select 
                value={formData.reportFrom} 
                onValueChange={(value) => setFormData({...formData, reportFrom: value})}
                disabled={loadingEmployees}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingEmployees ? "Loading employees..." : "Select an employee contact"} />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem 
                      key={employee.employeeID} 
                      value={`${employee.department} — ${employee.lastName}, ${employee.firstName}`}
                    >
                      {employee.department} — {employee.lastName}, {employee.firstName}
                    </SelectItem>
                  ))}
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
              <Select value={formData.timeOnSite} onValueChange={(value) => setFormData({...formData, timeOnSite: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Time Off Site:</label>
              <Select value={formData.timeOffSite} onValueChange={(value) => setFormData({...formData, timeOffSite: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

      {/* Multiple Crews Section */}
      {crews.map((crew) => (
        <Card key={crew.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{crew.name}</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => addCrewEntry(crew.id)} size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Line
              </Button>
              {crews.length > 1 && (
                <AlertDialog open={confirmDeleteCrewId === crew.id} onOpenChange={(open) => !open && setConfirmDeleteCrewId(null)}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      onClick={() => setConfirmDeleteCrewId(crew.id)} 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove Crew
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to delete the Crew from the Daily Report.
                        If you continue, all data entered into this crew will be lost.
                        <br /><br />
                        Are you sure that you want to delete this Crew?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>NO</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => removeCrew(crew.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Yes, delete this Crew
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Crew-level Cost Code and Work Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-sm font-medium">Cost Code:</label>
                <Input
                  value={crew.costCode}
                  onChange={(e) => updateCrew(crew.id, 'costCode', e.target.value)}
                  placeholder="Enter cost code..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Work Type:</label>
                <Select
                  value={crew.workType}
                  onValueChange={(value) => updateCrew(crew.id, 'workType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-700 hover:bg-blue-700">
                  <TableHead className="text-white">Employees</TableHead>
                  <TableHead className="text-white">ST</TableHead>
                  <TableHead className="text-white">OT</TableHead>
                  <TableHead className="text-white">Lost</TableHead>
                  <TableHead className="text-white">Work</TableHead>
                  <TableHead className="text-white">Comments</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crew.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Select
                        value={entry.employee}
                        onValueChange={(value) => updateCrewEntry(crew.id, entry.id, 'employee', value)}
                        disabled={loadingEmployees}
                      >
                        <SelectTrigger className="min-w-[200px]">
                          <SelectValue placeholder={loadingEmployees ? "Loading..." : "Select Employee"} />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem 
                              key={employee.employeeID} 
                              value={`${employee.lastName}, ${employee.firstName}`}
                            >
                              {employee.lastName}, {employee.firstName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.st}
                        onChange={(e) => updateCrewEntry(crew.id, entry.id, 'st', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.ot}
                        onChange={(e) => updateCrewEntry(crew.id, entry.id, 'ot', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.lost}
                        onChange={(e) => updateCrewEntry(crew.id, entry.id, 'lost', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.work}
                        onChange={(e) => updateCrewEntry(crew.id, entry.id, 'work', e.target.value)}
                        className="min-w-[150px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.comments}
                        onChange={(e) => updateCrewEntry(crew.id, entry.id, 'comments', e.target.value)}
                        className="min-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCrewEntry(crew.id, entry.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableCell className="text-white font-bold">Total Hours:</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHoursForCrew(crew.id, 'st')}</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHoursForCrew(crew.id, 'ot')}</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHoursForCrew(crew.id, 'lost')}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Add Crew Button */}
      <div className="flex justify-center">
        <Button onClick={addCrew} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Add Crew
        </Button>
      </div>

      {/* Grand Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Grand Total Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getAllTotalHours('st')}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Total ST Hours</div>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{getAllTotalHours('ot')}</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Total OT Hours</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{getAllTotalHours('lost')}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Total Lost Hours</div>
            </div>
          </div>
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
