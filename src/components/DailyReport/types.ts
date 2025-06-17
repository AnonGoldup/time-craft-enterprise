
export interface CrewEntry {
  id: string;
  employee: string;
  st: number;
  ot: number;
  lost: number;
  work: string;
  comments: string;
}

export interface Crew {
  id: string;
  name: string;
  costCode: string;
  workType: string;
  entries: CrewEntry[];
}

export interface SubcontractorEntry {
  id: string;
  subcontractor: string;
  workers: number;
  comments: string;
}

export interface EquipmentEntry {
  id: string;
  equipment: string;
  hours: number;
  notes: string;
}

export interface MaterialEntry {
  id: string;
  material: string;
  quantity: number;
  per: string;
  notes: string;
}

export interface CommentFields {
  descriptionOfWork: string;
  descriptionOfWorkInternal: boolean;
  jobSiteConditions: string;
  jobSiteConditionsInternal: boolean;
  extraWorkFavors: string;
  extraWorkFavorsInternal: boolean;
  accidentReport: string;
  accidentReportInternal: boolean;
  nearMissesHazardIds: string;
  nearMissesHazardIdsInternal: boolean;
  jobSiteCleanliness: string;
  jobSiteCleanlinessInternal: boolean;
  commentsProblems: string;
  commentsProblemsInternal: boolean;
  internalComments: string;
  internalCommentsInternal: boolean;
}

export interface FormData {
  customNumber: string;
  reportFrom: string;
  date: string;
  weather: string;
  timeOnSite: string;
  wind: string;
  timeOffSite: string;
  temperature: string;
  totalWorkers: number;
}
