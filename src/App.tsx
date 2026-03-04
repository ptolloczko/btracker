import { useRecords } from '@/hooks/useRecords'
import { RecordForm } from '@/components/RecordForm'

function App() {
  const { addRecord } = useRecords()

  return (
    <div className="min-w-[1024px] max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">btracker</h1>
      <RecordForm onAdd={addRecord} />
    </div>
  )
}

export default App
