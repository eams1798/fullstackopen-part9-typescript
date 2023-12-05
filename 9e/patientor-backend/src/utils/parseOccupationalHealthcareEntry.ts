import { Diagnose } from "../types";
import { isDate, isString } from "../utils";
import Diagnoses from "../data/diagnoses";

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseStartDate = (startDate: unknown): string => {
  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing start date");
  }
  return startDate;
};

const parseEndDate = (endDate: unknown): string => {
  if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing end date");
  }
  return endDate;
};

const isSickLeave = (param: unknown): param is { startDate: unknown; endDate: unknown } => {
  return param !== null && typeof param === "object"
    && "startDate" in param
    && "endDate" in param;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (!isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sick leave");
  }
  return {
    startDate: parseStartDate(sickLeave.startDate),
    endDate: parseEndDate(sickLeave.endDate)
  };
};

const isDiagnoseCode = (param: unknown): param is Diagnose["code"] => {
  const diagnosisCodes = Diagnoses.map(d => d.code);
  return isString(param) && diagnosisCodes.includes(param);
};

const areDiagnosisCodes = (param: unknown): param is Array<string> => {
  return Array.isArray(param) && param.every(code => isDiagnoseCode(code) && code !== "");
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose["code"]> => {
  if (!areDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes");
  }
  return diagnosisCodes;
};

type OccupationalHealthcareSubProperties = {
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
  diagnosisCodes?: Array<string>;
};

const parseOccupationalHealthcareEntry = (entry: unknown): OccupationalHealthcareSubProperties=> {  
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing occupational entry");
  }
  if ("employerName" in entry) {
    let subProperties: OccupationalHealthcareSubProperties  = {
      employerName: parseEmployerName(entry.employerName)
    };
    if ("sickLeave" in entry) {
      subProperties = {
        ...subProperties,
        sickLeave: parseSickLeave(entry.sickLeave)
      };
    }
    if ("diagnosisCodes" in entry) {
      subProperties.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    } else {
      subProperties.diagnosisCodes = [] as Array<Diagnose["code"]>;
    }
    return subProperties;
  } else {
    throw new Error("Incorrect or missing occupational entry");
  }
};

export default parseOccupationalHealthcareEntry;