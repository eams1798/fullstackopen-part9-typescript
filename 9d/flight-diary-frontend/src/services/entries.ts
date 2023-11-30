import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"
import toNewDiaryEntry from "../utils"

const url = 'http://localhost:3000/api/diaries'

export const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const { data } = await axios.get<DiaryEntry[]>(url)
  const parsedData: DiaryEntry[] = data.map(entry => ({
    id: entry.id,
    ...toNewDiaryEntry(entry)
  }))
  return parsedData
}

export const addEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const { data } = await axios.post<DiaryEntry>(url, entry)
  return {
    id: data.id,
    ...toNewDiaryEntry(data)
  }
}