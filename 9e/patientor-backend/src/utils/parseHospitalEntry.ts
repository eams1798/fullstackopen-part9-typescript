import { Diagnose } from "../types";
import { isString, parseDate } from "../utils";
import Diagnoses from "../data/diagnoses";

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

const isDischarge = (param: unknown): param is { date: unknown; criteria: unknown } => {
  return param !== null && typeof param === "object"
  && "date" in param
  && "criteria" in param;
};

const parseDischarge = (discharge: unknown): { date: string; criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
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
    throw new Error("Incorrect diagnosis codes");
  }
  return diagnosisCodes;
};

type HospitalSubProperties = {
  discharge: { date: string; criteria: string };
  diagnosisCodes?: Array<Diagnose["code"]>;
};

const parseHospitalEntry = (entry: unknown): HospitalSubProperties => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing hospital entry");
  }
  if ("discharge" in entry) {
    const subProperties: HospitalSubProperties = {
      discharge: parseDischarge(entry.discharge)
    };
    if ("diagnosisCodes" in entry) {
      subProperties.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    } else {
      subProperties.diagnosisCodes = [] as Array<Diagnose["code"]>;
    }
    return subProperties;
  } else {
    throw new Error("Incorrect or missing hospital entry");
  }
};

export default parseHospitalEntry;