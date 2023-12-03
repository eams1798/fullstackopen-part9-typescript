export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}


export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, "id">;

export type PatientResponse = Omit<Patient, "ssn" | "entries">;
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NewPatient = Omit<Patient, "id">;