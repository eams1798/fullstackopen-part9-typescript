import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import parsedPatient from "../utils/parsedItem";
import parseEntry from "../utils/parseEntry";

const getAll = async (): Promise<Patient[]> => {
  let { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  data = data.map(parsedPatient);

  return data;
};

const getPatientById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return parsedPatient(data);
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientId: string, object: EntryWithoutId): Promise<Entry> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  const returnedData = {
    ...parseEntry(data),
    id: data.id,
  };
  return returnedData;
};

export default {
  getAll, getPatientById, create, addEntry
};

