import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";

interface IOccupationalHCEntryProps {
  entry: OccupationalHealthcareEntry
  diagnosis: Diagnosis[]
}

const OccupationalHCEntryInfo = ({ entry, diagnosis }: IOccupationalHCEntryProps) => {
  return (
    <div>
      <p>{entry.date} {entry.type} {entry.employerName}</p>
      <p>{entry.description}</p>
      {entry.sickLeave? <p key="sickLeave">Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p> : <></>}
      {entry.diagnosisCodes? (
          <div key="diagnosisCodes">
        <p>Diagnosis codes:</p>
        <ul>
        {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code} {diagnosis.find(d => d.code === code)?.name}</li>
            ))}
        </ul>
      </div>) : <></>}
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHCEntryInfo;