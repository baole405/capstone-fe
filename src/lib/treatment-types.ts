export interface TreatmentRelationship {
  id: number;
  userId: number;
  expertId: number;
  clinicId: number;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  accessGranted: boolean;
  accessExpiry: string | null;
}

export interface Consultation {
  id: number;
  date: string;
  expertName: string;
  clinicName: string;
  notes: string;
  type: "initial" | "follow-up" | "adjustment";
}

export interface Routine {
  id: number;
  createdDate: string;
  products: string[];
  expertName: string;
  phase: string;
}

export interface ProgressPhoto {
  id: number;
  date: string;
  url: string;
  week: number;
  notes?: string;
}

export interface TreatmentNote {
  id: number;
  date: string;
  expertName: string;
  content: string;
  type: "observation" | "adjustment" | "milestone" | "concern";
  privateNote: boolean;
}

export interface TreatmentHistory {
  treatmentId: number;
  clinicName: string;
  expertName: string;
  startDate: string;
  endDate: string;
  phase: string;
  consultations: Consultation[];
  routines: Routine[];
  progressPhotos: ProgressPhoto[];
  notes: TreatmentNote[];
}

export const canExpertAccessPatient = (
  relationship: TreatmentRelationship,
): boolean => {
  const now = new Date();
  const endDate = new Date(relationship.endDate);
  const accessExpiry = relationship.accessExpiry
    ? new Date(relationship.accessExpiry)
    : null;

  return (
    relationship.status === "active" &&
    relationship.accessGranted &&
    now <= endDate &&
    (!accessExpiry || now <= accessExpiry)
  );
};

export const getAvailableTreatmentHistory = (
  _userId: number,
  _newExpertId: number,
): TreatmentHistory[] => {
  return [];
};

export const canViewTreatmentData = (
  relationship: TreatmentRelationship,
  _dataType: "notes" | "photos" | "history" | "all",
): boolean => {
  return canExpertAccessPatient(relationship);
};

export const getRemainingAccessDays = (
  relationship: TreatmentRelationship,
): number => {
  const now = new Date();
  const endDate = new Date(relationship.endDate);
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};
