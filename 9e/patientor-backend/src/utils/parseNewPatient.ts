import { Gender, NewPatient } from "../types";
import { isString, parseDate } from "../utils";

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isSSN = (param: string): boolean => {
  /* string matches with XXXXX-XXX(X) */
  const regex = /^\d{6}-\d{1,2}[A-Za-z0-9]{2}$/;
  return regex.test(param);
};


const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender as Gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in obj
      && "dateOfBirth" in obj
      && "ssn" in obj
      && "gender" in obj
      && "occupation" in obj) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      ssn: parseSSN(obj.ssn),
      dateOfBirth: parseDate(obj.dateOfBirth),
      occupation: parseOccupation(obj.occupation),
      gender: parseGender(obj.gender),
      entries: []
    };

    return newPatient;
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};

export default parseNewPatient;