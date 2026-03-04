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
    const updated = sortNewestFirst([...records, record])
    setRecords(updated)
    save(updated)
  }

  function updateRecord(id: string, input: BloodRecordInput): void {
    const updated = sortNewestFirst(
      records.map((r) => (r.id === id ? { ...r, ...input } : r))
    )
    setRecords(updated)
    save(updated)
  }

  function deleteRecord(id: string): void {
    const updated = records.filter((r) => r.id !== id)
    setRecords(updated)
    save(updated)
  }

  return { records, addRecord, updateRecord, deleteRecord }
}
