import { parseUUID } from ".";
import { Patient } from "../types";
import parseEntry from "./parseEntry";
import parseNewPatient from "./parseNewPatient";

const parsedPatient = (item: unknown): Patient => {
  if (!item || typeof item !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("name" in item
      && "id" in item
      && "dateOfBirth" in item
      && "ssn" in item
      && "gender" in item
      && "occupation" in item
      && "entries" in item
      && Array.isArray(item.entries)) {
    return ({
      ...parseNewPatient(item),
      id: parseUUID(item.id),
      entries: item.entries.map((entry) => ({
        ...parseEntry(entry),
        id: parseUUID(entry.id)
      })),
    });
  } else {
    throw new Error("Incorrect or missing data");
  }
};

export default parsedPatient;