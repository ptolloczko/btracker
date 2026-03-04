export type BloodRecord = {
  id: string
  date: string
  systolic: number
  diastolic: number
  heartRate?: number
  glucose?: number
  notes?: string
  createdAt: string
}

export type BloodRecordInput = Omit<BloodRecord, 'id' | 'createdAt'>
