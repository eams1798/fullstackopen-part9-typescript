import { useContext, useState } from "react";
import { HospitalEntry, Patient } from "../../../../../types";
import parseEntry from "../../../../../utils/parseEntry";
import AppContext from "../../../../../context";
import patientService from "../../../../../services/patients";
import { isAxiosError } from "axios";

interface INewEntryProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const NewHospitalEntry = ({ setPatients, patientId }: INewEntryProps) => {
  const { setNotification } = useContext(AppContext);

  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [currentDC, setCurrentDC] = useState<string>("");

  const addDiagnosisCode = () => {
    if (!currentDC) {
      window.scrollTo(0, 0);
      setNotification({
        type: "error",
        message: "No codes added"
      });
      return;
    }
    setDiagnosisCodes([...diagnosisCodes, currentDC]);
    setCurrentDC("");
  };

  const addEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: Omit<HospitalEntry, "id"> = {
      date,
      specialist,
      description,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      },
      diagnosisCodes
    };

    try {
      const addedEntry = await patientService.addEntry(patientId, parseEntry(newEntry));
      setPatients((patients) =>{
        const patientIndex = patients.findIndex(p => p.id === patientId);
        patients[patientIndex] = {
          ...patients[patientIndex],
          entries: [addedEntry, ...patients[patientIndex].entries]
        };
        return patients;
      });
      window.scrollTo(0, 0);
      setNotification({
        type: "success",
        message: "Successfully added entry"
      });

      setDate("");
      setSpecialist("");
      setDescription("");
      setDischargeDate("");
      setDischargeCriteria("");
      setDiagnosisCodes([]);
      setCurrentDC("");
    } catch (e) {
      if (isAxiosError(e)) {
        window.scrollTo(0, 0);
        setNotification({
          type: "error",
          message: e.response?.data
        });
      }
      else if (e instanceof Error) {
        window.scrollTo(0, 0);
        setNotification({
          type: "error",
          message: e.message
        });
      } else {
        console.error(e);
      }
    }
  };
  return (
    <form onSubmit={addEntry}>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="specialist">Specialist</label>
        <input
          id="specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <h3>Discharge</h3>
        <span>
          <label htmlFor="dischargeDate" >Date</label>
          <input
            id="dischargeDate"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)} />
        </span>
        <span>
          <label htmlFor="dischargeCriteria">Criteria</label>
          <input
            id="dischargeCriteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)} />
        </span>
      </div>
      <div>
        <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
        <p>
          {diagnosisCodes.map(dc => (
          <button
            onClick={() => setDiagnosisCodes(diagnosisCodes.filter(d => d !== dc))}
            key={dc}>{dc}
          </button>))}
        </p>
        <input
          id="diagnosisCodes"
          type="text"
          value={currentDC}
          onChange={(e) => setCurrentDC(e.target.value)} />
        <button
          type="button"
          onClick={addDiagnosisCode}>Add Diagnosis
        </button>
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewHospitalEntry;