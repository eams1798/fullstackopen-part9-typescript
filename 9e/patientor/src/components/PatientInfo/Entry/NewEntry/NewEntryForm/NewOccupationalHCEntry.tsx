import { useContext, useEffect, useState } from "react";
import { OccupationalHealthcareEntry, Patient } from "../../../../../types";
import parseEntry from "../../../../../utils/parseEntry";
import AppContext from "../../../../../context";
import patientService from "../../../../../services/patients";
import { isAxiosError } from "axios";

interface INewEntryProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const NewOccupationalHCEntry = ({ setPatients, patientId }: INewEntryProps) => {
  const { setNotification } = useContext(AppContext);

  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<boolean>(false);
  const [SLStartdate, setSLStartDate] = useState<string>("");
  const [SLEndDate, setSLEndDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [currentDC, setCurrentDC] = useState<string>("");

  useEffect(() => {
    if (sickLeave === false) {
      setSLStartDate("");
      setSLEndDate("");
    }
  }, [sickLeave]);

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

    const newEntry: Omit<OccupationalHealthcareEntry, "id"> = sickLeave? {
      date,
      specialist,
      description,
      type: "OccupationalHealthcare",
      employerName,
      sickLeave: {
        startDate: SLStartdate,
        endDate: SLEndDate
      },
      diagnosisCodes
    } : {
      date,
      specialist,
      description,
      type: "OccupationalHealthcare",
      employerName,
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
      setEmployerName("");
      setSickLeave(false);
      setSLStartDate("");
      setSLEndDate("");
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
        <label htmlFor="employerName">Employer Name</label>
        <input
          id="employerName"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sickLeave">Sick Leave?</label>
        <input
          id="sickLeave"
          type="checkbox"
          checked={sickLeave}
          onChange={() => setSickLeave(!sickLeave)} /> 
        {sickLeave && (
        <>
          <label htmlFor="SLStartdate">Start Date</label>
          <input
            id="SLStartdate"
            type="date"
            value={SLStartdate}
            onChange={(e) => setSLStartDate(e.target.value)} />
          <label htmlFor="SLEndDate">End Date</label>
          <input
            id="SLEndDate"
            type="date"
            value={SLEndDate}
            onChange={(e) => setSLEndDate(e.target.value)} />
        </>
        )}
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

export default NewOccupationalHCEntry;