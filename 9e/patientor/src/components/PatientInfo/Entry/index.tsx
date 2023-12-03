import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../../types";
import diagnosisService from "../../../services/diagnosis";
import OccupationalHCEntryInfo from "./OccupationalHealthcareEntry";
import HealthCheckEntryInfo from "./HealthCheckEntry";
import HospitalEntryInfo from "./HospitalEntry";

interface IEntryInfoProps {
  entry: Entry
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryInfo = ({ entry }: IEntryInfoProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosisList = await diagnosisService.getallDiagnosis();
      setDiagnosis(diagnosisList);
    };
    void fetchDiagnosisList();
  });

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryInfo entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHCEntryInfo entry={entry} diagnosis={diagnosis} />;
    case "Hospital":
      return <HospitalEntryInfo entry={entry} diagnosis={diagnosis} />;
    default:
      return <p key="error">{assertNever(entry)}</p>;
    }
};

export default EntryInfo;