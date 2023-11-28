import patients from "../data/patients";
import { NewPatient, Patient, PatientResponse } from "../types";
import { v4 as uuid } from "uuid";

export const getPatients = (): PatientResponse[] => {
  return patients.map(p => ({
    ...p,
    ssn: undefined
  }));
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuid()
  };

  patients.push(newPatient);

  return newPatient;
};