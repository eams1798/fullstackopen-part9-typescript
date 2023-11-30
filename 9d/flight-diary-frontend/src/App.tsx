import { useEffect, useState } from 'react'
import './App.css'
import NewEntry from './components/NewEntry'
import { DiaryEntry } from './types'
import { getAllEntries } from './services/entries'
import EntryList from './components/EntryList'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getAllEntries()
      setEntries(data)
    }
    fetchEntries()
  }, [])
  return (
    <div className="App" >
      <NewEntry setEntries={setEntries} />
      <EntryList entries={entries} />
    </div>
  )
}

export default App
