import { Entry, EntryWithoutId, UnionOmit } from "../types";
import { isString, parseDate } from "../utils";
import parseHealthCheckEntry from "./parseHealthCheckEntry";
import parseHospitalEntry from "./parseHospitalEntry";
import parseOccupationalHealthcareEntry from "./parseOccupationalHealthcareEntry";

enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital"
}

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType).map(e => e.toString()).includes(param);
};

const parseEntrySubProperties = (type: unknown, subProperties: unknown): UnionOmit<Entry, "id" | "specialist" | "description" | "date"> => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error("Incorrect or missing type");
  }
  switch (type) {
  case EntryType.HealthCheck:
    return {
      type,
      ...parseHealthCheckEntry(subProperties)
    };
  case EntryType.OccupationalHealthcare:
    return {
      type,
      ...parseOccupationalHealthcareEntry(subProperties)
    };
  case EntryType.Hospital:
    return {
      type,
      ...parseHospitalEntry(subProperties)
    };
  default:
    throw new Error("Incorrect or missing type");
  }
};

const parseEntry = (entry: unknown): EntryWithoutId => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing entry");
  }
  
  if ("type" in entry
      && "specialist" in entry
      && "description" in entry
      && "date" in entry) {
    const restOfSubProperties = {...entry};
    delete restOfSubProperties.specialist;
    delete restOfSubProperties.description;
    delete restOfSubProperties.date;
  
    return ({
      specialist: parseSpecialist(entry.specialist),
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      ...parseEntrySubProperties(entry.type, restOfSubProperties),
    });
  } else {
    throw new Error("Incorrect or missing entry");
  }
};

export default parseEntry;