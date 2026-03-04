import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecords } from './useRecords'

const STORAGE_KEY = 'btracker_records'

const sampleInput = {
  date: '2026-03-04T10:00:00.000Z',
  systolic: 120,
  diastolic: 80,
}

beforeEach(() => {
  localStorage.clear()
})

describe('useRecords — addRecord', () => {
  it('stores the record in localStorage under btracker_records', () => {
    const { result } = renderHook(() => useRecords())

    act(() => {
      result.current.addRecord(sampleInput)
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown[]
    expect(stored).toHaveLength(1)
  })

  it('persisted record contains the input data', () => {
    const { result } = renderHook(() => useRecords())

    act(() => {
      result.current.addRecord(sampleInput)
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Array<Record<string, unknown>>
    expect(stored[0]).toMatchObject({
      systolic: 120,
      diastolic: 80,
      date: '2026-03-04T10:00:00.000Z',
    })
  })

  it('generates a unique id and createdAt for each record', () => {
    const { result } = renderHook(() => useRecords())

    act(() => {
      result.current.addRecord(sampleInput)
      result.current.addRecord({ ...sampleInput, date: '2026-03-04T11:00:00.000Z' })
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Array<Record<string, unknown>>
    expect(stored).toHaveLength(2)
    expect(stored[0].id).toBeTruthy()
    expect(stored[1].id).toBeTruthy()
    expect(stored[0].id).not.toBe(stored[1].id)
    expect(stored[0].createdAt).toBeTruthy()
  })
})
