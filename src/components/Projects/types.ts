
export interface Project {
  id: string;
  code: string;
  name: string;
  status: 'OPEN' | 'COMPLETE';
  manager: string;
  category: string;
  estimatedHours: number;
  actualHours: number;
}

export type ViewMode = 'list' | 'card' | 'tile';

export const mockProjects: Project[] = [
  { id: '1', code: '000', name: 'VOID JOB', status: 'COMPLETE', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '2', code: '001', name: 'Template Project 2019', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '3', code: '002', name: 'Template Solar Projects 2019', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '4', code: '003', name: '*VOID* Template OLD Projects', status: 'COMPLETE', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '5', code: '004', name: 'Template Special Projects', status: 'OPEN', manager: 'Tyler Segin', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '6', code: '005', name: 'Service Projects', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '7', code: '006', name: 'Overhead Project Template', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '8', code: '007', name: 'IPD Project Template', status: 'OPEN', manager: 'Not Assigned', category: 'Commercial', estimatedHours: 0, actualHours: 0 },
  { id: '9', code: '16-0020', name: 'Borden Park Pool', status: 'COMPLETE', manager: 'Drew Yeoman', category: 'Commercial', estimatedHours: 2, actualHours: 4080 },
];
