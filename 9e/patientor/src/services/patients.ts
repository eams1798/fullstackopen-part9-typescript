import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";
import parsedPatient from "../utils/parsedItem";

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

export default {
  getAll, getPatientById, create
};

