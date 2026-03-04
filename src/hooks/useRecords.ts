import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { BloodRecord, BloodRecordInput } from '@/types/BloodRecord'

const STORAGE_KEY = 'btracker_records'

function load(): BloodRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as BloodRecord[]) : []
  } catch {
    return []
  }
}

function save(records: BloodRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function sortNewestFirst(records: BloodRecord[]): BloodRecord[] {
  return [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function useRecords() {
  const [records, setRecords] = useState<BloodRecord[]>(() => sortNewestFirst(load()))

  function addRecord(input: BloodRecordInput): void {
    const record: BloodRecord = {
      ...input,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }
    const updated = sortNewestFirst([...load(), record])
    save(updated)
    setRecords(updated)
  }

  function updateRecord(id: string, input: BloodRecordInput): void {
    const updated = sortNewestFirst(
      load().map((r) => (r.id === id ? { ...r, ...input } : r))
    )
    save(updated)
    setRecords(updated)
  }

  function deleteRecord(id: string): void {
    const updated = load().filter((r) => r.id !== id)
    save(updated)
    setRecords(updated)
  }

  return { records, addRecord, updateRecord, deleteRecord }
}
