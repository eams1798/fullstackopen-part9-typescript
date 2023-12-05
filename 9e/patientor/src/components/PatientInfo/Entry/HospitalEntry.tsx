import { Diagnosis, HospitalEntry } from "../../../types";

interface IHospitalEntryProps {
  entry: HospitalEntry
  diagnosis: Diagnosis[]
}

const HospitalEntryInfo = ({ entry, diagnosis }: IHospitalEntryProps) => {
  return (
    <div>
      <p>{entry.date} {entry.type}</p>
      <p>{entry.description}</p>
      <p key="discharge">Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
      {entry.diagnosisCodes? (
      <div key="diagnosisCodes">
        {entry.diagnosisCodes.length > 0 && <p>Diagnosis codes:</p>}
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

export default HospitalEntryInfo;