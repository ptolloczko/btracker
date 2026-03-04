import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { BloodRecord } from '@/types/BloodRecord'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const EMPTY = '—'

type Props = {
  records: BloodRecord[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function RecordList({ records, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Records</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No records yet. Add your first one above.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Glucose</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="whitespace-nowrap">{formatDate(record.date)}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {record.systolic}/{record.diastolic} mmHg
                  </TableCell>
                  <TableCell>
                    {record.heartRate != null ? `${record.heartRate} bpm` : EMPTY}
                  </TableCell>
                  <TableCell>
                    {record.glucose != null ? `${record.glucose} mg/dL` : EMPTY}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {record.notes ?? EMPTY}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button variant="outline" size="sm" onClick={() => onEdit(record.id)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-2"
                      onClick={() => onDelete(record.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
