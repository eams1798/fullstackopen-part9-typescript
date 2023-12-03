import { isString, parseDate } from "../utils";

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

const areDiagnosisCodes = (param: unknown): param is Array<string> => {
  return Array.isArray(param) && param.every(code => isString(code));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
  if (!areDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes");
  }
  return diagnosisCodes;
};

type HospitalSubProperties = {
  discharge: { date: string; criteria: string };
  diagnosisCodes?: Array<string>;
}

const parseHospitalEntry = (entry: unknown): HospitalSubProperties => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing entry");
  }
  if ("discharge" in entry) {
    const subProperties: HospitalSubProperties = {
      discharge: parseDischarge(entry.discharge)
    };
    if ("diagnosisCodes" in entry) {
      subProperties.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }
    return subProperties;
  } else {
    throw new Error("Incorrect or missing entry");
  }
};

export default parseHospitalEntry;