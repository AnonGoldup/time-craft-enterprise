
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { employeeApi, Employee } from '@/services/api';
import { 
  Crew, 
  CrewEntry, 
  SubcontractorEntry, 
  EquipmentEntry, 
  MaterialEntry, 
  CommentFields, 
  FormData 
} from '@/components/DailyReport/types';
import BasicInfoSection from '@/components/DailyReport/BasicInfoSection';
import CommentsSection from '@/components/DailyReport/CommentsSection';
import CrewSection from '@/components/DailyReport/CrewSection';
import GrandTotalSummary from '@/components/DailyReport/GrandTotalSummary';
import SubcontractorsSection from '@/components/DailyReport/SubcontractorsSection';
import EquipmentSection from '@/components/DailyReport/EquipmentSection';
import MaterialsSection from '@/components/DailyReport/MaterialsSection';
import IssuesSection from '@/components/DailyReport/IssuesSection';

const EditDailyReport: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [formData, setFormData] = useState<FormData>({
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

  const [commentFields, setCommentFields] = useState<CommentFields>({
    descriptionOfWork: '',
    descriptionOfWorkInternal: false,
    jobSiteConditions: '',
    jobSiteConditionsInternal: false,
    extraWorkFavors: '',
    extraWorkFavorsInternal: false,
    accidentReport: '',
    accidentReportInternal: false,
    nearMissesHazardIds: '',
    nearMissesHazardIdsInternal: false,
    jobSiteCleanliness: '',
    jobSiteCleanlinessInternal: false,
    commentsProblems: '',
    commentsProblemsInternal: false,
    internalComments: '',
    internalCommentsInternal: false,
  });

  const [issues, setIssues] = useState('');
  const [confirmDeleteCrewId, setConfirmDeleteCrewId] = useState<string | null>(null);

  // Collapsible states for each section
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isSubcontractorsOpen, setIsSubcontractorsOpen] = useState(false);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isIssuesOpen, setIsIssuesOpen] = useState(false);
  const [crewExpandStates, setCrewExpandStates] = useState<Record<string, boolean>>({});

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

  const updateSubcontractor = (id: string, field: keyof SubcontractorEntry, value: string | number) => {
    setSubcontractors(subcontractors.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
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

  const updateEquipment = (id: string, field: keyof EquipmentEntry, value: string | number) => {
    setEquipment(equipment.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
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

  const updateMaterial = (id: string, field: keyof MaterialEntry, value: string | number) => {
    setMaterials(materials.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const updateCommentField = (field: keyof CommentFields, value: string | boolean) => {
    setCommentFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving daily report...', {
      formData,
      crews,
      subcontractors,
      equipment,
      materials,
      commentFields,
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

  const toggleCrewExpand = (crewId: string) => {
    setCrewExpandStates(prev => ({
      ...prev,
      [crewId]: !prev[crewId]
    }));
  };

  const removeSubcontractor = (id: string) => {
    setSubcontractors(subcontractors.filter(entry => entry.id !== id));
  };

  const removeEquipment = (id: string) => {
    setEquipment(equipment.filter(entry => entry.id !== id));
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(entry => entry.id !== id));
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
    <div className="space-y-3">
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

      {/* Basic Info Section */}
      <BasicInfoSection
        formData={formData}
        setFormData={setFormData}
        employees={employees}
        loadingEmployees={loadingEmployees}
        isOpen={isBasicInfoOpen}
        setIsOpen={setIsBasicInfoOpen}
      />

      {/* Comments Section */}
      <CommentsSection
        commentFields={commentFields}
        updateCommentField={updateCommentField}
        isOpen={isCommentsOpen}
        setIsOpen={setIsCommentsOpen}
      />

      {/* Crew Sections */}
      {crews.map((crew) => (
        <CrewSection
          key={crew.id}
          crew={crew}
          employees={employees}
          loadingEmployees={loadingEmployees}
          isExpanded={crewExpandStates[crew.id] !== false}
          showDeleteConfirmation={confirmDeleteCrewId === crew.id}
          canDelete={crews.length > 1}
          onToggleExpanded={() => toggleCrewExpand(crew.id)}
          onAddEntry={() => addCrewEntry(crew.id)}
          onRemoveEntry={(entryId) => removeCrewEntry(crew.id, entryId)}
          onUpdateCrew={(field, value) => updateCrew(crew.id, field, value)}
          onUpdateEntry={(entryId, field, value) => updateCrewEntry(crew.id, entryId, field, value)}
          onRequestDelete={() => setConfirmDeleteCrewId(crew.id)}
          onConfirmDelete={() => removeCrew(crew.id)}
          onCancelDelete={() => setConfirmDeleteCrewId(null)}
          getTotalHours={(type) => getTotalHoursForCrew(crew.id, type)}
        />
      ))}

      {/* Add Crew Button */}
      <div className="flex justify-center py-2">
        <Button onClick={addCrew} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Add Crew
        </Button>
      </div>

      {/* Grand Total Summary */}
      <GrandTotalSummary
        totalST={getAllTotalHours('st')}
        totalOT={getAllTotalHours('ot')}
        totalLost={getAllTotalHours('lost')}
      />

      {/* Subcontractors Section */}
      <SubcontractorsSection
        subcontractors={subcontractors}
        isOpen={isSubcontractorsOpen}
        setIsOpen={setIsSubcontractorsOpen}
        onAddSubcontractor={addSubcontractor}
        onUpdateSubcontractor={updateSubcontractor}
        onRemoveSubcontractor={removeSubcontractor}
      />

      {/* Equipment Section */}
      <EquipmentSection
        equipment={equipment}
        isOpen={isEquipmentOpen}
        setIsOpen={setIsEquipmentOpen}
        onAddEquipment={addEquipment}
        onUpdateEquipment={updateEquipment}
        onRemoveEquipment={removeEquipment}
      />

      {/* Materials Section */}
      <MaterialsSection
        materials={materials}
        isOpen={isMaterialsOpen}
        setIsOpen={setIsMaterialsOpen}
        onAddMaterial={addMaterial}
        onUpdateMaterial={updateMaterial}
        onRemoveMaterial={removeMaterial}
      />

      {/* Issues Section */}
      <IssuesSection
        issues={issues}
        setIssues={setIssues}
        isOpen={isIssuesOpen}
        setIsOpen={setIsIssuesOpen}
      />

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Data
        </Button>
      </div>
    </div>
  );
};

export default EditDailyReport;
