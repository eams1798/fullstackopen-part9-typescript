import { useContext, useState } from "react";
import { HealthCheckEntry, Patient } from "../../../../../types";
import parseEntry from "../../../../../utils/parseEntry";
import AppContext from "../../../../../context";
import patientService from "../../../../../services/patients";
import { isAxiosError } from "axios";

interface INewEntryProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const NewHealthCheckEntry = ({ setPatients, patientId }: INewEntryProps) => {
  const { setNotification } = useContext(AppContext);

  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const addEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: Omit<HealthCheckEntry, "id"> = {
      date,
      specialist,
      description,
      type: "HealthCheck",
      healthCheckRating
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
      setHealthCheckRating(0);
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
        <label htmlFor="healthCheckRating">Health Check Rating</label>
        <input
          id="healthCheckRating"
          type="number"
          value={healthCheckRating}
          min="0"
          max="3"
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewHealthCheckEntry;