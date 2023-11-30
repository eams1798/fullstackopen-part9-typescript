import { DiaryEntry } from "../types"

interface IEntryListProps {
  entries: DiaryEntry[]
}

const EntryList = ({ entries }: IEntryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map(entry =>(
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Weather: {entry.weather}</p>
          <p>Visibility: {entry.visibility}</p>
          <p>Comment: {entry.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default EntryList