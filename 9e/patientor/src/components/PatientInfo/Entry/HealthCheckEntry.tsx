import { HealthCheckEntry } from "../../../types";

interface IHealthCheckEntryProps {
  entry: HealthCheckEntry
}

const HealthCheckEntryInfo = ({ entry }: IHealthCheckEntryProps) => {
  return (
    <div>
      <p>{entry.date} {entry.type}</p>
      <p>{entry.description}</p>
      <p key="healthCheckRating">Health check rating: {entry.healthCheckRating}</p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryInfo;