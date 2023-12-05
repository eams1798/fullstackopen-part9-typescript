import { Patient } from "../../../../../types";
import NewHealthCheckEntry from "./NewHealthCheckEntry";
import NewHospitalEntry from "./NewHospitalEntry";
import NewOccupationalHCEntry from "./NewOccupationalHCEntry";

interface IFormComponentProps {
  entryType: string;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const FormComponent = ({entryType, setPatients, patientId}: IFormComponentProps) => {
  switch (entryType) {
    case "HealthCheck":
      return <NewHealthCheckEntry setPatients={setPatients} patientId={patientId} />;
    case "OccupationalHealthcare":
      return <NewOccupationalHCEntry setPatients={setPatients} patientId={patientId} />;
    case "Hospital":
      return <NewHospitalEntry setPatients={setPatients} patientId={patientId} />;
    default:
      return <p key="error">Entry type not allowed</p>;
  }
};

export default FormComponent;