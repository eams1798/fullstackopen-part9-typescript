import { useState } from "react";
import { Patient } from "../../../../../types";
import FormComponent from "./FormComponent";

interface INewEntryFormProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const NewEntryForm = ({ setPatients, patientId }: INewEntryFormProps) => {
  const [entryType, setEntryType] = useState<string>("HealthCheck");

  return (
    <div className="new-entry">
      <h2>New Entry</h2>
      <label>
        Type
        <select onChange={(e) => setEntryType(e.target.value)}>
          <option value="HealthCheck">Health Check</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
          <option value="Hospital">Hospital</option>
        </select>
      </label>
      <FormComponent entryType={entryType} setPatients={setPatients} patientId={patientId}></FormComponent>
    </div>
  );
};

export default NewEntryForm;