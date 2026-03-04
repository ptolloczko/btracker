import { useRecords } from '@/hooks/useRecords'
import { RecordForm } from '@/components/RecordForm'
import { RecordList } from '@/components/RecordList'

function App() {
  const { records, addRecord } = useRecords()

  function handleEdit(id: string) {
    console.log('edit', id)
  }

  function handleDelete(id: string) {
    console.log('delete', id)
  }

  return (
    <div className="min-w-[1024px] max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">btracker</h1>
      <RecordForm onAdd={addRecord} />
      <RecordList records={records} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default App
