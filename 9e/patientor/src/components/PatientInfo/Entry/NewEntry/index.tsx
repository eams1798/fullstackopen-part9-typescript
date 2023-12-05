import { Patient } from "../../../../types.ts";
import Togglable from "../../../Togglable.tsx";
import NewEntryForm from "./NewEntryForm/index.tsx";

interface INewEntryProps {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  patientId: string;
}

const NewEntry = ({ setPatients, patientId }: INewEntryProps) => {
  return (
    <Togglable openButtonLabel="ADD NEW ENTRY">
      <></>
      <NewEntryForm setPatients={setPatients} patientId={patientId} />
    </Togglable>
  );
};

export default NewEntry;