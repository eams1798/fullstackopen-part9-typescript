import { isString } from ".";
import { Diagnosis } from "../types";

const parseDiagnoseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error("Incorrect or missing code");
  }
  return code;
};

const parseDiagnoseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDiagnoseLatin = (latin: unknown): string | undefined => {
  if (!isString(latin)) {
    return undefined;
  }
  return latin;
};


const parseDiagnose = (diagnose: unknown): Diagnosis => {
  if (!diagnose || typeof diagnose !== "object") {
    throw new Error("Incorrect or missing diagnose");
  }

  if ("code" in diagnose
      && "name" in diagnose) {
    const newDiagnose: Diagnosis = {
      code: parseDiagnoseCode(diagnose.code),
      name: parseDiagnoseName(diagnose.name),
    };
    if ("latin" in diagnose) {
      newDiagnose.latin = parseDiagnoseLatin(diagnose.latin);
    }
    return newDiagnose;
  } else {
    throw new Error("Incorrect data: some fields are missing");
  }
};

export default parseDiagnose;