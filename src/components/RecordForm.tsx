import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { BloodRecordInput } from '@/types/BloodRecord'

const isPositiveInt = (v: string) => Number.isInteger(Number(v)) && Number(v) > 0
const isPositiveNum = (v: string) => !isNaN(Number(v)) && Number(v) > 0

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  systolic: z.string().min(1, 'Required').refine(isPositiveInt, 'Must be a positive integer'),
  diastolic: z.string().min(1, 'Required').refine(isPositiveInt, 'Must be a positive integer'),
  heartRate: z.string().refine((v) => v === '' || isPositiveInt(v), 'Must be a positive integer'),
  glucose: z.string().refine((v) => v === '' || isPositiveNum(v), 'Must be a positive number'),
  notes: z.string().max(200, 'Max 200 characters'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  onAdd: (input: BloodRecordInput) => void
}

export function RecordForm({ onAdd }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: '', systolic: '', diastolic: '', heartRate: '', glucose: '', notes: '' },
  })

  function onSubmit(values: FormValues) {
    onAdd({
      date: values.date,
      systolic: Number(values.systolic),
      diastolic: Number(values.diastolic),
      heartRate: values.heartRate ? Number(values.heartRate) : undefined,
      glucose: values.glucose ? Number(values.glucose) : undefined,
      notes: values.notes || undefined,
    })
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Record</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="systolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systolic (mmHg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diastolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diastolic (mmHg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heartRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Heart Rate (bpm){' '}
                      <span className="text-muted-foreground text-xs">optional</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="72" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="glucose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Glucose (mg/dL){' '}
                      <span className="text-muted-foreground text-xs">optional</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Notes{' '}
                      <span className="text-muted-foreground text-xs">optional</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any additional notes..." maxLength={200} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button type="submit" className="w-full">Add Record</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
