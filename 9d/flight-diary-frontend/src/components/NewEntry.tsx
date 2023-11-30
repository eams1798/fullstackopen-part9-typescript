import { useState } from "react"
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types"
import { parseDate, parseVisibility, parseWeather } from "../utils"
import { addEntry } from "../services/entries"

interface INewEntryProps {
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const NewEntry = ({ setEntries }: INewEntryProps) => {
  const [date, setDate] = useState<string>("")
  const [weather, setWeather] = useState<Weather | "">("")
  const [visibility, setVisibility] = useState<Visibility | "">("")
  const [comment, setComment] = useState<string>("")

  const handleWeather = (event: React.FormEvent<HTMLFieldSetElement>) => {
    setWeather(parseWeather((event.target as HTMLInputElement).value))
  }

  const handleVisibility = (event: React.FormEvent<HTMLFieldSetElement>) => {
    setVisibility(parseVisibility((event.target as HTMLInputElement).value))
  }

  const createNewEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!date || !weather || !visibility || !comment) {
      return
    }
    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    }

    const entry = await addEntry(newEntry)

    setEntries(prevEntries => {
      return [entry, ...prevEntries]
    })
  }
  
  return (
    <div id="new-entry">
      <h2>Add new entry</h2>
      <form onSubmit={createNewEntry}>
        <div id="entry-date" >
          <label htmlFor="date">Date</label>
          <input type="date" id="date" onChange={(e) => setDate(parseDate(e.target.value))} />
        </div>
        <fieldset id="entry-visibility" onChange={(e) => handleVisibility(e)}>
          <p>Visibility</p>
          <input type="radio" id="great" name="visibility" value="great"/>
          <label htmlFor="great">great</label>
          <input type="radio" id="good" name="visibility" value="good" />
          <label htmlFor="good">good</label>
          <input type="radio" id="ok" name="visibility" value="ok"/>
          <label htmlFor="ok">ok</label>
          <input type="radio" id="poor" name="visibility" value="poor"/>
          <label htmlFor="poor">poor</label>
        </fieldset>
        <fieldset id="entry-weather" onChange={(e) => handleWeather(e)}>
          <p>Weather</p>
          <input type="radio" id="sunny" name="weather" value="sunny"/>
          <label htmlFor="sunny">sunny</label>
          <input type="radio" id="rainy" name="weather" value="rainy"/>
          <label htmlFor="rainy">rainy</label>
          <input type="radio" id="cloudy" name="weather" value="cloudy" />
          <label htmlFor="cloudy">cloudy</label>
          <input type="radio" id="stormy" name="weather" value="stormy"/>
          <label htmlFor="stormy">stormy</label>
          <input type="radio" id="windy" name="weather" value="windy"/>
          <label htmlFor="windy">windy</label>
        </fieldset>
        <div id="entry-comment">
          <label htmlFor="comment">Comment</label>
          <input type="text" id="comment" onChange={(e) => setComment(e.target.value)}/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewEntry