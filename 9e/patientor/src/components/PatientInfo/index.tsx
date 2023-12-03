import { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryInfo from "./Entry";

interface IPatientInfoProps {
  patient: Patient
}
const PatientInfo = ({ patient } : IPatientInfoProps) => {
  return (
    <div className="patient">
      <section className="basic-info">
        <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon />: null}</h2>
        {patient.dateOfBirth && <p>date of birth: {patient.dateOfBirth}</p>}
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </section>
      <section className="entries">
        { patient.entries && patient.entries.length > 0? (
          <>
            <h3>entries</h3>
            {patient.entries.map((entry) => (
            <EntryInfo entry={entry} key={entry.id} />
            ))}
          </>
        )
        : <p>No entries</p>}
      </section>
    </div>
  );
};

export default PatientInfo;