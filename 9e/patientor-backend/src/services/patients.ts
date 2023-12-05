import patients from "../data/patients";
import { Entry, EntryWithoutId, NewPatient, Patient } from "../types";
import { v4 as uuid } from "uuid";

export const getPatients = (): Patient[] => {
  console.log(patients);
  
  return patients;
};

export const getPatientById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuid()
  };

  patients.push(newPatient);

  return newPatient;
};

export const addEntrytoPatient = (entry: EntryWithoutId, patientId: string): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  const patientIndex = patients.findIndex(p => p.id === patientId);
  if (!patientIndex) {
    throw new Error("Patient not found");
  }

  patients[patientIndex].entries = [...patients[patientIndex].entries, newEntry];

  return newEntry;
};
